import React from 'react'
import { useNavigate } from "react-router-dom"


const Megaphone = () => {
  const navigate = useNavigate()
  
  return (
    <div>Megaphone

        <button onClick ={()=>navigate('/Spinintro')}> Continue to The Venue</button>

    </div>
  )
}

export default Megaphone