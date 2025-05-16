import React from 'react'
import { useNavigate } from "react-router-dom"


const Shout = () => {
    const navigate = useNavigate()
  
  return (
    <div>
      
        <button onClick ={()=>navigate('/Spinintro')}> Continue to The Venue</button>

    </div>
  )
}

export default Shout
