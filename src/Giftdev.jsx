import React from 'react'
import { useNavigate } from "react-router-dom";
import { Card } from "./Card.json"

const Giftdev = () => {
  console.log(Card);

  const navigate = useNavigate();

  return (
    <div>
      <div className="">
        <h2 className="t">Kindy pick a gift for DevTimmy</h2>
      </div>
      
      <div className="git-card-section">

        <div className="card-section-1" >
          
          <div className="message-card" onClick={() => navigate('/Form/Message')}>
            <h3>{Card[0].name}</h3>
            <p>{ Card[0].description }</p>
                
          </div>

          <div className="audio-card" onClick={()=>navigate('/Form/Audio')}>
            <h3>{Card[1].name}</h3>
            <p>{ Card[1].description }</p>
                
          </div>
        </div>

        <div className="card-section-2" >
            <div className="video-card" onClick={()=>navigate('/Form/Videoform')}>
                <h3>{Card[2].name}</h3>
                <p>{ Card[2].description }</p>
            </div>

            <div className="throwback-card" onClick={()=>navigate('/Form/Throwback')}>
                 <h3>{Card[3].name}</h3>
                <p>{ Card[3].description }</p>
            </div>
        </div>

      </div>

        <button onClick = {()=> navigate("/Spinintro")}> Next </button>

    </div>
   
  )
}

export default Giftdev
