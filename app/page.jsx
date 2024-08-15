"use client"

import axios from "axios";
import { useState } from "react";

export default function Home() {

  const [videoLink, setVideoLink] = useState('')
  const [finalLink, setFinalLink] = useState()
  const [showDownload, setShowDownload] = useState(false)

  const handleDownload = async () => {
    try {
      // const res = await axios.get('/api/downloader?url=https://www.youtube.com/watch?v=Lq9ZMwqqr9U')
      const res = await axios.get(`/api/downloader?url=${videoLink}`)
      setFinalLink(res.data.format.url)
      setShowDownload(true)
    } catch (err) {
      console.log(err)
    }

  }


  return (
    <>
      <input type="text" placeholder="link here" value={videoLink} onChange={(e) => setVideoLink(e.target.value)}/>
      <button onClick={handleDownload}>Download</button>

      {
        showDownload && (
          <div className="bg-black">
            {/* {finalLink} */}
            <video src={finalLink}>
            </video>
            
            </div>
        )
      }
    </>
  );
}
