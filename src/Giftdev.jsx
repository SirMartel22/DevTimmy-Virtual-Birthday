import React from 'react'
import { useNavigate } from "react-router-dom";

const Giftdev = () => {

  const navigate = useNavigate();
  return (
    <div>
      <div className="">
        <h2 className="t">Kindy pick a gift for DevTimmy</h2>
        <button onClick = {()=> navigate("/Spinintro")}> Next </button>
       </div>
    </div>
  )
}

export default Giftdev
