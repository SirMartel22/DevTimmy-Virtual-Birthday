import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import html2canvas from 'html2canvas';
import { FFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = new FFmpeg();

const Admin = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load FFmpeg on component mount
  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpeg.loaded) {
        try {
          await ffmpeg.load({
            coreURL: 'https://unpkg.com/@ffmpeg/core/dist/umd/ffmpeg-core.js',
            wasmURL: 'https://unpkg.com/@ffmpeg/core/dist/umd/ffmpeg-core.wasm',
          });
          console.log('FFmpeg loaded successfully');
        } catch (error) {
          console.error('Failed to load FFmpeg:', error);
          alert('Failed to load FFmpeg. Please try again later.');
        }
      }
    };
    loadFFmpeg();
  }, []);

  // Fetch gifts from Supabase
  const fetchGifts = async () => {
    try {
      const { data, error } = await supabase
        .from('throwback_gifts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      console.log('Fetched gifts: ', data);
      setGifts(data || []);
    } catch (error) {
      console.error('Error fetching gifts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGifts();
    const subscription = supabase
      .channel('throwback_gifts_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'throwback_gifts',
        },
        (payload) => {
          console.log('New gift received!', payload);
          setGifts((currentGifts) => [payload.new, ...currentGifts]);
        }
      )
      .subscribe((status) => {
        console.log('Subscription status: ', status);
      });

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const downloadCard = async (gift) => {
    try {
      console.log('Processing card for: ', gift.name);
      const cardElement = document.getElementById(`card-${gift.id}`);
      if (!cardElement) {
        alert('Card element not found');
        return;
      }

      // Temporarily hide the download button
      const downloadButton = cardElement.querySelector('.download-button');
      if (downloadButton) downloadButton.style.display = 'none';

      // Capture card as canvas (excluding download button)
      const canvas = await html2canvas(cardElement, {
        backgroundColor: '#4E6688',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      // Restore download button visibility
      if (downloadButton) downloadButton.style.display = 'block';

      // Convert canvas to blob and then to Uint8Array for FFmpeg
      const cardBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      const cardArrayBuffer = await cardBlob.arrayBuffer();
      const cardUint8Array = new Uint8Array(cardArrayBuffer);

      // Determine file type and process accordingly
      const fileExtension = gift.image_url.split('.').pop().toLowerCase();
      const isVideo = ['mp4', 'webm', 'mov'].includes(fileExtension);
      const isAudio = ['mp3', 'wav', 'm4a'].includes(fileExtension);
      const isMessage = gift.type === 'message';

      if (isMessage) {
        // For messages, download the card as an image with text
        canvas.toBlob((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `throwback-message-${gift.name}-${gift.id}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          console.log('Message card download completed!');
        });
        return;
      }

      // Fetch the media file
      const response = await fetch(gift.image_url, { mode: 'cors' });
      if (!response.ok) throw new Error('Failed to fetch media file');
      const mediaBlob = await response.blob();
      const mediaArrayBuffer = await mediaBlob.arrayBuffer();
      const mediaUint8Array = new Uint8Array(mediaArrayBuffer);

      // Write card image to FFmpeg FS
      ffmpeg.FS('writeFile', 'card.png', cardUint8Array);

      if (isVideo) {
        // Process video: overlay card as frame
        ffmpeg.FS('writeFile', 'input.mp4', mediaUint8Array);
        await ffmpeg.exec([
          '-i', 'input.mp4',
          '-i', 'card.png',
          '-filter_complex', '[0:v][1:v]overlay=0:0',
          '-c:a', 'copy',
          'output.mp4'
        ]);
        const output = ffmpeg.FS('readFile', 'output.mp4');
        const outputBlob = new Blob([output.buffer], { type: 'video/mp4' });
        const url = window.URL.createObjectURL(outputBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `throwback-video-${gift.name}-${gift.id}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log('Video download completed!');
      } else if (isAudio) {
        // Process audio: create video with thumbnail and card frame
        ffmpeg.FS('writeFile', 'input.' + fileExtension, mediaUint8Array);
        await ffmpeg.exec([
          '-i', 'card.png',
          '-i', 'input.' + fileExtension,
          '-c:v', 'libx264',
          '-c:a', 'aac',
          '-shortest',
          'output.mp4'
        ]);
        const output = ffmpeg.FS('readFile', 'output.mp4');
        const outputBlob = new Blob([output.buffer], { type: 'video/mp4' });
        const url = window.URL.createObjectURL(outputBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `throwback-audio-${gift.name}-${gift.id}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log('Audio video download completed!');
      } else {
        // For images, download as is with card frame
        canvas.toBlob((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `throwback-image-${gift.name}-${gift.id}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          console.log('Image download completed!');
        });
      }

      // Clean up FFmpeg FS
      ffmpeg.FS('unlink', 'card.png');
      if (isVideo) ffmpeg.FS('unlink', 'input.mp4');
      if (isAudio) ffmpeg.FS('unlink', 'input.' + fileExtension);
      if (isVideo || isAudio) ffmpeg.FS('unlink', 'output.mp4');
    } catch (error) {
      console.error('Download failed: ', error);
      alert('Download failed. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading throwback gifts...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Throwback Gifts for DevTimmy
      </h1>
      {gifts.length === 0 ? (
        <p className="text-center text-gray-500">No throwback gifts yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols lg:grid-cols-3 gap-6">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              id={`card-${gift.id}`}
              className="bg-[#4E6688] rounded-lg shadow-lg p-4"
            >
              {gift.type === 'message' ? (
                <>
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <p className="text-center p-4">{gift.message}</p>
                  </div>
                  <h3 className="text-lg font-semibold">From: {gift.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(gift.created_at).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <>
                  <img
                    src={gift.image_url}
                    alt={`Throwback from ${gift.name}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold">From: {gift.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(gift.created_at).toLocaleDateString()}
                  </p>
                </>
              )}
              <button
                onClick={() => downloadCard(gift)}
                className="download-button w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;