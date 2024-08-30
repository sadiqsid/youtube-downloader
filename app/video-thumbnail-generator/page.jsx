"use client";

import { useState } from 'react';

export default function Page() {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=ipuz8ASBrRE');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [error, setError] = useState('');

 


  const handleDownload = async () => {
    try {
    
      const videoId = videoUrl.split('v=')[1];
      console.log(videoId)
      
      if (!videoId) {
        setError('Invalid YouTube URL');
        return;
      }
      const response = await fetch(`/api/thumbnail?videoId=${videoId}`);
      const data = await response.json();

      if (response.ok) {
        setThumbnailUrl(data.thumbnailUrl);
        setError('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter YouTube video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button onClick={handleDownload}>Download Thumbnail</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {thumbnailUrl && (
        <div>
          <h2>Thumbnail</h2>
          <img src={thumbnailUrl} alt="YouTube Thumbnail" />
          <a href={thumbnailUrl} download={`thumbnail.jpg`}>
            Download Thumbnail
          </a>
        </div>
      )}
    </div>
  );
}