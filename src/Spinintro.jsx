import React from 'react'

import {useNavigate} from "react-router-dom"

const Spinintro = () => {
  const navigate = useNavigate()
  return (
    <div>
      
      <h2> Ahan ahan, “You wan just attend DevTimmy’s virtual birthday like that? No proof? 😭📸”</h2>
      <button className="" onClick={()=> navigate('/Spin')}>Go get yourself a gift</button>
    
    </div>
  )
}

export default Spinintro