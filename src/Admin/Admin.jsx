import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import html2canvas from 'html2canvas';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

// Single FFmpeg instance
const ffmpeg = new FFmpeg();

const Admin = () => {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ffmpegLoaded, setFFmpegLoaded] = useState(false);
  const [ffmpegError, setFFmpegError] = useState(null);
  const [ffmpegProgress, setFFmpegProgress] = useState(0);

  // Load FFmpeg from local files
  const loadFFmpeg = useCallback(async (retries = 3, delay = 2000) => {
    const localConfig = {
      coreURL: '/static/ffmpeg/ffmpeg-core.js',
      wasmURL: '/static/ffmpeg/ffmpeg-core.wasm',
      // workerURL: '/static/ffmpeg/ffmpeg-core.worker.js', // Uncomment if using multi-threaded FFmpeg
    };

    ffmpeg.on('progress', ({ progress }) => {
      setFFmpegProgress(Math.round(progress * 100));
    });

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Attempt ${attempt}: Loading FFmpeg from local files`);
        await ffmpeg.load(localConfig);
        setFFmpegLoaded(true);
        console.log('FFmpeg loaded successfully');
        return true;
      } catch (error) {
        console.warn(`Attempt ${attempt}: FFmpeg load failed:`, error.message);
        if (attempt === retries) {
          setFFmpegError(`Failed to load FFmpeg after ${retries} attempts: ${error.message}`);
          return false;
        }
        await new Promise((resolve) => setTimeout(resolve, delay * attempt));
      }
    }
  }, []);

  // Load FFmpeg on mount
  useEffect(() => {
    loadFFmpeg();
  }, [loadFFmpeg]);

  // Fetch gifts from Supabase
  const fetchGifts = async () => {
    try {
      const { data, error } = await supabase
        .from('throwback_gifts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      console.log('Fetched gifts:', data);
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
        console.log('Subscription status:', status);
      });

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const downloadCard = async (gift) => {
    try {
      console.log('Processing card for:', gift.name);
      const cardElement = document.getElementById(`card-${gift.id}`);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      // Hide download button during capture
      const downloadButton = cardElement.querySelector('.download-button');
      if (downloadButton) downloadButton.style.display = 'none';

      // Capture card as canvas
      const canvas = await html2canvas(cardElement, {
        backgroundColor: '#4E6688',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      // Restore download button
      if (downloadButton) downloadButton.style.display = 'block';

      // Convert canvas to blob
      const cardBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));

      // Handle message-based gifts or missing URLs
      if (!gift.image_url || gift.type === 'message') {
        const url = window.URL.createObjectURL(cardBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `throwback-${gift.type || 'card'}-${gift.name}-${gift.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log('Card download completed!');
        return;
      }

      // Determine file type
      const fileExtension = gift.image_url.split('.').pop()?.toLowerCase();
      if (!fileExtension) {
        throw new Error('Unable to determine file type');
      }

      const isVideo = ['mp4', 'webm', 'mov', 'avi'].includes(fileExtension);
      const isAudio = ['mp3', 'wav', 'm4a', 'aac'].includes(fileExtension);

      // Check FFmpeg for video/audio
      if ((isVideo || isAudio) && !ffmpegLoaded) {
        throw new Error('FFmpeg is not loaded. Video/audio processing is disabled.');
      }

      if (isVideo || isAudio) {
        // Fetch media file
        const response = await fetch(gift.image_url, { mode: 'cors' });
        if (!response.ok) throw new Error(`Failed to fetch media file: ${response.statusText}`);
        const mediaBlob = await response.blob();

        // Write files to FFmpeg filesystem
        await ffmpeg.writeFile('card.png', await fetchFile(cardBlob));
        await ffmpeg.writeFile(`input.${fileExtension}`, await fetchFile(mediaBlob));

        if (isVideo) {
          // Process video: overlay card
          await ffmpeg.exec([
            '-i', `input.${fileExtension}`,
            '-i', 'card.png',
            '-filter_complex', '[0:v][1:v]overlay=0:0',
            '-c:a', 'copy',
            '-y',
            'output.mp4',
          ]);
        } else if (isAudio) {
          // Process audio: create video with static image
          await ffmpeg.exec([
            '-loop', '1',
            '-i', 'card.png',
            '-i', `input.${fileExtension}`,
            '-c:v', 'libx264',
            '-c:a', 'aac',
            '-shortest',
            '-pix_fmt', 'yuv420p',
            '-y',
            'output.mp4',
          ]);
        }

        // Download output
        const outputData = await ffmpeg.readFile('output.mp4');
        const outputBlob = new Blob([outputData], { type: 'video/mp4' });
        const url = window.URL.createObjectURL(outputBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `throwback-${isVideo ? 'video' : 'audio'}-${gift.name}-${gift.id}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Clean up
        await Promise.allSettled([
          ffmpeg.deleteFile('card.png'),
          ffmpeg.deleteFile(`input.${fileExtension}`),
          ffmpeg.deleteFile('output.mp4'),
        ]).then((results) => {
          results.forEach((result, index) => {
            if (result.status === 'rejected') {
              console.warn(`Cleanup failed for file ${index}:`, result.reason);
            }
          });
        });

        console.log(`${isVideo ? 'Video' : 'Audio'} download completed!`);
      } else {
        // Download image-based gift
        const url = window.URL.createObjectURL(cardBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `throwback-image-${gift.name}-${gift.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log('Image download completed!');
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert(`Download failed: ${error.message}. Please try again.`);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading throwback gifts...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Throwback Gifts for DevTimmy</h1>

      {/* FFmpeg Status */}
      {!ffmpegLoaded && !ffmpegError && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>⏳ Loading FFmpeg... ({ffmpegProgress}%)</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-yellow-600 h-2.5 rounded-full"
              style={{ width: `${ffmpegProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {ffmpegError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>❌ FFmpeg failed to load: {ffmpegError}</p>
          <p className="text-sm mt-1">
            Video and audio processing is not available, but images and messages can still be downloaded.
          </p>
        </div>
      )}

      {ffmpegLoaded && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>✅ FFmpeg loaded successfully! All features available.</p>
        </div>
      )}

      {gifts.length === 0 ? (
        <p className="text-center text-gray-500">No throwback gifts yet!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gifts.map((gift) => {
            const isMedia = gift.image_url && ['mp4', 'webm', 'mov', 'avi', 'mp3', 'wav', 'm4a', 'aac'].includes(
              gift.image_url.split('.').pop()?.toLowerCase()
            );
            return (
              <div
                key={gift.id}
                id={`card-${gift.id}`}
                className="bg-[#4E6688] rounded-lg shadow-lg p-4 text-white"
              >
                {gift.type === 'message' ? (
                  <>
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <p className="text-center p-4 text-gray-800">{gift.message}</p>
                    </div>
                    <h3 className="text-lg font-semibold">From: {gift.name}</h3>
                    <p className="text-sm text-gray-300">
                      {new Date(gift.created_at).toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  <>
                    {gift.image_url ? (
                      <img
                        src={gift.image_url}
                        alt={`Gift from ${gift.name}`}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="w-full h-48 bg-gray-200 rounded-lg mb-4 hidden items-center justify-center"
                    >
                      <p className="text-center p-4 text-gray-800">Media not available</p>
                    </div>
                    <h3 className="text-lg font-semibold">From: {gift.name}</h3>
                    <p className="text-sm text-gray-300">
                      {new Date(gift.created_at).toLocaleDateString()}
                    </p>
                  </>
                )}
                <button
                  onClick={() => downloadCard(gift)}
                  disabled={isMedia && !ffmpegLoaded}
                  className={`download-button w-full ${
                    isMedia && !ffmpegLoaded
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white py-2 px-4 rounded-md transition duration-300 mt-4`}
                  title={isMedia && !ffmpegLoaded ? 'Video/audio processing unavailable' : ''}
                >
                  Download
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Admin;