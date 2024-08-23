"use client"

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [videoLink, setVideoLink] = useState('');
  const [finalLink, setFinalLink] = useState('');
  const [showDownload, setShowDownload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!videoLink) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await axios.get(`https://udownloader.vercel.app/api/downloader?url=${videoLink}`);
      console.log(res.data)
      setFinalLink(res.data.format.url);
      setShowDownload(true);
      
    } catch (err) {
      console.log(err);
      setError('Failed to download video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter YouTube link here"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
      />
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Downloading...' : 'Download'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {showDownload && (
        <div>
          <video src={finalLink} width="320" height="240" controls></video>
        
        </div>
      )}
    </>
  );
}
