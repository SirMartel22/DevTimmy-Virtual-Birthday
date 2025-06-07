import React from 'react';
import {useNavigate} from "react-router-dom"

const Cake = () => {

  const navigate = useNavigate()
  return (
    <div>

          {/* <button onClick ={()=>navigate('./Thanks')}> Process</button> */}
          <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick ={()=>navigate('../Thanks')}> Proceeds to Checkout </button>

    </div>
  );
}

export default Cake;
