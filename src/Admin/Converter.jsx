// import React, { useState } from 'react';
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// // import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg/dist/esm';

// const ffmpeg = createFFmpeg({ log: true });

// const VideoConverter = () => {
//   const [ready, setReady] = useState(false);
//   const [video, setVideo] = useState(null);
//   const [output, setOutput] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const loadFFmpeg = async () => {
//     if (!ffmpeg.isLoaded()) {
//       setLoading(true);
//       await ffmpeg.load();
//       setReady(true);
//       setLoading(false);
//     }
//   };

//   const handleUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setVideo(file);
//   };

//   const convertToMp4 = async () => {
//     setLoading(true);
//     ffmpeg.FS('writeFile', 'input.webm', await fetchFile(video));
//     await ffmpeg.run('-i', 'input.webm', 'output.mp4');
//     const data = ffmpeg.FS('readFile', 'output.mp4');

//     const videoUrl = URL.createObjectURL(
//       new Blob([data.buffer], { type: 'video/mp4' })
//     );
//     setOutput(videoUrl);
//     setLoading(false);
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">FFmpeg in React (Browser)</h2>

//       {!ready ? (
//         <button
//           onClick={loadFFmpeg}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {loading ? 'Loading FFmpeg...' : 'Load FFmpeg'}
//         </button>
//       ) : (
//         <>
//           <input type="file" onChange={handleUpload} accept="video/*" />
//           <button
//             onClick={convertToMp4}
//             className="bg-green-600 text-white px-4 py-2 rounded ml-2"
//             disabled={!video || loading}
//           >
//             {loading ? 'Converting...' : 'Convert to MP4'}
//           </button>
//         </>
//       )}

//       {output && (
//         <div className="mt-4">
//           <h3 className="font-semibold mb-2">Converted Video:</h3>
//           <video src={output} controls className="w-full max-w-md" />
//           <a
//             href={output}
//             download="converted.mp4"
//             className="block text-blue-500 mt-2 underline"
//           >
//             Download MP4
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoConverter;
