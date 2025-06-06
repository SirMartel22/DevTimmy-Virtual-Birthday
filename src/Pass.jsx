import React from 'react';

import {useNavigate} from "react-router-dom"

const Pass = () => {

  const navigate = useNavigate()
  return (
    <div className="form-container flex flex-col lg:flex md:flex justify-center items-center gap-16 text-center">
      <div className="form flex flex-col lg:flex md:flex justify-center items-center gap-16 bg-[#332D56] py-12 px-8 rounded-md cursor-pointer shadow-div-shadow ">

        <div className ="description flex flex-col lg:flex md:flex space-y-4">
          <h2 className="font-bold text-2xl lg:text-3xl md:text-3xl">Kindly Provide Your Pass</h2>
          <span className="font-bold">Click Continue to Venue after filling in the form</span> 
          <p> Please give my bouncer a gate pass so he doesn’t start flexing unnecessary power.</p>
          <span className="text-5xl">😂</span>
        </div>

        <div className=" flex justify-center items-center">
          <img className="rounded-md w-full h-full lg:w-[70%] lg:h-[55%] shadow-div-shadow-2 hover:scale-105 transform transition duration-500" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc290ZXh2NWc1Y2kyYW5hNnc2N2cxaGVrM282Nnl5ZmZxMzdzNm5scSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Je3CjIvDr0X2yn6/giphy.gif"/>
        </div>
              
              <form className = " text-left space-y-2">
                <div className ="name">
                  <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Name: </label>
                  <input className="bg-transparent w-[70%] border border-1 border-[#4E6688] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4" name="name" type="text" placeholder="Kindly enter your name "/>
                </div>
          
                  <div className ="name">
                    <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Who invited you: </label>
                    <select className="bg-transparent border border-1 border-[#4E6688] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4">
                        <option className="bg-transparent" value="I don't Know"> I have no Idea</option>
                        <option className="bg-transparent" value="DevTimmy"> Devtimmy</option>
                  
                      </select>      
          </div>
                
                <div className ="name">
                            
                  </div>
              

        </form>
        
          </div>
          
         <div className="next-prev-btn flex flex-col lg:flex lg:flex-row items-center justify-center space-y-16 lg:space-x-24 lg:space-y-0">
          
            <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick ={()=>navigate('/Welcome')}> Return to Previous Page</button>
            <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick ={()=>navigate('/Video')}> Continue to The Venue</button>
              
          </div>


      
    </div>
  );
}

export default Pass;
