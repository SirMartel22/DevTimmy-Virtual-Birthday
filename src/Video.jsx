import React from 'react'
import {useNavigate} from "react-router-dom"

const Video = () => {
  const navigate = useNavigate()
  return (
      <div>
          
        <div className="celebrant-Video flex flex-col items-center justify-center gap-12">
              
          <h2 className="text-3xl text-center">Here’s Why We’re All Here ☀️🎉🎂🥳</h2>

          <div>
              <video autoPlay controls className="lg:w-[405px] lg:h-[600px] md:w-[360px] lg:h-[640] md:h-96 mx-auto rounded-md">
                <source src="https://res.cloudinary.com/djhfy0pr4/video/upload/v1750385637/Virtue_Festiva_gpvalz.mp4" type="video/mp4"/>
              
              </video>
            
          </div>
          
          <div className="next-prev-btn flex flex-col lg:flex lg:flex-row items-center justify-center space-y-16 lg:space-x-24 lg:space-y-0">
          
            <button className="bg-[#6A80B9] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick ={()=>navigate('/Pass')}> Return to Previous Page</button>
            <button className="bg-[#27548A] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"  onClick={()=>navigate('/Giftdev')}>Proceed to Present Your gift</button>
              
          </div>
              
        </div>
      

      
    </div>
  )
}

export default Video
