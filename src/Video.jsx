import React from 'react'
import {useNavigate} from "react-router-dom"

const Video = () => {
  const navigate = useNavigate()
  return (
      <div>
          
        <div className="celebrant-Video flex flex-col items-center justify-center">
              
          <h2 className="text-3xl">Hi Guys! Listen to DevTimmy Talk 🤭 </h2>

          <div>
              <video autoPlay className="">
                <source src="" />
                Your Browser does not support the video tag
              </video>
            
          </div>
            
          <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"  onClick={()=>navigate('/Giftdev')}>Continue</button>
              
        </div>
      

      
    </div>
  )
}

export default Video
