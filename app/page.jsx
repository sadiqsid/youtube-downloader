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
      console.log(res.data.format.url)
      setFinalLink(res.data.format.url)
      setShowDownload(true)
    } catch (err) {
      console.log(err)
    }

  }

  const handleInputChange = (event) => {
    setVideoLink(event.target.value);
  }

  return (
    <>
      <input type="text" placeholder="link here" value={videoLink} onChange={handleInputChange} />
      <button onClick={handleDownload}>Download</button>

      {
        showDownload && (
          <div>
            {/* {finalLink} */}
            <video control>
              <source src={finalLink}></source>
            </video>
            
            </div>
        )
      }
    </>
  );
}
