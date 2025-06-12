import React, {useState} from 'react';
import { useNavigate } from "react-router-dom"
import Video from '/src/Video'


const Pass = () => {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const potentialNames = {
    "gideon": "Welcome O.G.A Baba 🙌🏽",
    "adeleke": "Respect!!! Sir Adeleke 👑",
    "ireoluwa": "Deaconess!!! 🙌🏽😂😂😂 ",
    "ire": "Deaconess!!! 🙌🏽😂😂😂 ",
    "pope": "Pope Olowo, Alhaji Oni gold ni Texas 🙌🏽😂😂😂, Thanks so much for being here Sir",
    "eazy": "#Do_Real_Thing, Welcome Boss😂",
    "Olaronke": "Eola Boss, Welcome ma😂",
    "Ronke": "Eola Boss, Welcome ma😂",
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  const inputName = name.trim().toLowerCase();

  
    if (potentialNames[inputName]) {
      alert(potentialNames[inputName]);
    } else if(inputName == []){
      alert("input field can't be empty")
      return
    } else {
      alert(`Hi ${name}Hope you have fun in this Party! Welcome!!!`)
    }

    navigate('/Video')
    setName('');
  }
  
  return (
    <div className="form-container flex flex-col lg:flex md:flex justify-center items-center gap-16 text-center">
      <div className="form flex flex-col lg:flex md:flex justify-center items-center gap-16 bg-[#4E6688] py-12 px-8 rounded-md cursor-pointer shadow-div-shadow ">

        <div className ="description flex flex-col lg:flex md:flex space-y-4">
          <h2 className="font-bold text-2xl lg:text-3xl md:text-3xl">Kindly Provide Your Pass</h2>
          <span className="font-bold">Click Continue to Venue after filling in the form</span> 
          <p> Please give my bouncer a gate pass so he doesn’t start flexing unnecessary power.</p>
          <span className="text-5xl">😂</span>
        </div>

        <div className=" flex justify-center items-center">
          <img className="rounded-md w-full h-full lg:w-[70%] lg:h-[55%] shadow-div-shadow-2 hover:scale-105 transform transition duration-500" src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExc290ZXh2NWc1Y2kyYW5hNnc2N2cxaGVrM282Nnl5ZmZxMzdzNm5scSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Je3CjIvDr0X2yn6/giphy.gif"/>
        </div>
              
              <form className = " text-left space-y-2" onSubmit={handleSubmit}>
                <div className ="name">
                  <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Name: </label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent w-[70%] border border-1 border-[#332D56] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4" name="name" placeholder="Kindly enter your name "/>
                </div>
          
                  <div className ="name">
                    <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Who invited you: </label>
                    <select className="bg-transparent border border-1 border-[#332D56] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4">
                        <option className="bg-transparent" value="I don't Know"> I have no Idea</option>
                        <option className="bg-transparent" value="DevTimmy"> Devtimmy</option>
                  
                      </select>      
                 </div>
                
                <div className ="name">
                            
                  </div>
              
            <button type="submit" className="bg-[#6A80B9] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"> Submit </button>

        </form>
        
          </div>
          
         <div className="next-prev-btn flex flex-col lg:flex lg:flex-row items-center justify-center space-y-16 lg:space-x-24 lg:space-y-0">
          
            <button className="bg-[#27548A] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick={()=>navigate('/Welcome')}> Return to Previous Page</button>
            {/* <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick ={()=>navigate('/Video')}> Continue to The Venue</button> */}
              
          </div>


      
    </div>
  );
}

export default Pass;
