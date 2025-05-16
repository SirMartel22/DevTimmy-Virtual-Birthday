import React from 'react'
import {useNavigate} from "react-router-dom"

const Video = () => {
  const navigate = useNavigate()
  return (
      <div>
          
          <div className=" celebrant-Video">
              
              <h2>Welcome Speech By The Celebrant</h2>

        <div>
            <video autoPlay className="">
              <source src="" />
              Your Browser does not support the video tag
            </video>
          
        </div>
            
        <button onClick={()=>navigate('/Giftdev')}>Continue</button>
              
          </div>
      

      
    </div>
  )
}

export default Video
