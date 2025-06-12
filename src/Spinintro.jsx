import React from 'react'

import {useNavigate} from "react-router-dom"

const Spinintro = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center gap-16 ">
      
      <h2 className="font-bold text-2xl text-center"> Ahan ahan, “You wan just attend DevTimmy’s virtual birthday like that? No proof? 😭📸”</h2>

       <div className=" flex justify-center items-center">
          <img className="rounded-md w-full h-full lg:w-[70%] lg:h-[55%] shadow-div-shadow-2 hover:scale-105 transform transition duration-500" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExanh2bDYyYTlwY2s2enkxbGRzOHdkanJlbGRpazkzb2pmbXVpZmV4eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MFIsOqzodLr7ewnkUb/giphy.gif"/>
        </div>
              
      
       <div className="next-prev-btn flex flex-col items-center justify-center space-y-16 lg:flex-row lg:space-x-24 lg:space-y-0">
              <button className="bg-[#6A80B9] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick ={()=>navigate('/GiftDev')}> Return to Previous Page</button>
              <button className="bg-[#27548A] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"  onClick={()=>navigate('/Spin')}>Pick a gift for yourself</button>
          </div>
    
    </div>
  )
}

export default Spinintro