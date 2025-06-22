import React from 'react'
import { useNavigate } from "react-router-dom";
import { Card } from "./Card.json"

const Giftdev = () => {
  // console.log(Card);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-16">
      <div className="">
        <h2 className="gift-dev-page font-bold text-center text-2xl lg:text-3xl">Kindy click on one of the cards below to gift The Host 💌🎈</h2>
      </div>
      
      <div className="gift-card-section flex flex-col gap-8 text-center">

        <div className="card-section-1 flex flex-col md:flex-row gap-8 " >
          
          <div className="message-card space-y-4 font-bold bg-[#4E6688] py-12 px-8 font lg:w-[400px] rounded-md cursor-pointer transform hover:scale-105 transition duration-500" onClick={() => navigate('/Form/Message')}>
            <h3>{Card[0].name}</h3>
            <p>{ Card[0].description }</p>
                
          </div>

           <div className="throwback-card space-y-4 font-bold bg-[#4E6688] py-12 px-8 lg:w-[400px] shadow-xl rounded-md cursor-pointer transform hover:scale-105 transition duration-300" onClick={()=>navigate('/Form/Throwback')}>
                <h3>{Card[3].name}</h3>
                <p>{ Card[3].description }</p>
              
          </div>
          
        </div>

        <div className="card-section-2 flex flex-col md:flex-row gap-8" >
            <div className="video-card bg-[#4E6688] py-12 px-8   font-bold lg:w-[400px] rounded-md cursor-pointer transform hover:scale-105 transition duration-300" onClick={()=>navigate('/Form/Videoform')}>
                {/* <h1 className="text-2xl text-red font-bold"> This Feature is not available at the moment </h1>  */}
                <h3>{Card[2].name}</h3>
                <p>{ Card[2].description }</p>
            </div>

          <div className="audio-card bg-[#4E6688] py-12 px-8  font-bold  lg:w-[400px] rounded-md cursor-pointer transform hover:scale-105 transition duration-300" onClick={()=>navigate('/Form/Audio')}>
            <h3>{Card[1].name}</h3>
            <p>{ Card[1].description }</p>
                
          </div>
        </div>

      </div>

        {/* <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick = {()=> navigate("/Spinintro")}> Next </button> */}
    </div>
  )
}

export default Giftdev
