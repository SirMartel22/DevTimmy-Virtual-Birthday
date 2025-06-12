import React from 'react'

import {useNavigate} from "react-router-dom"

const Spinintro = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center gap-16">
      
      <h2> Ahan ahan, “You wan just attend DevTimmy’s virtual birthday like that? No proof? 😭📸”</h2>
      {/* <button className="" onClick={() => navigate('/Spin')}>Go get yourself a gift</button> */}
      
       <div className="next-prev-btn flex items-center justify-center space-x-24">
              <button className="bg-[#6A80B9] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick ={()=>navigate('/GiftDev')}> Return to Previous Page</button>
              <button className="bg-[#27548A] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"  onClick={()=>navigate('/Spin')}>Pick a gift for yourself</button>
          </div>
    
    </div>
  )
}

export default Spinintro