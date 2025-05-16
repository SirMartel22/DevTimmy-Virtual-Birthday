import React from 'react'
import { useNavigate } from "react-router-dom"

const Dancer = () => {

  const navigate = useNavigate()
  return (
    <div>Dancer


          <button onClick ={()=>navigate('/Spinintro')}> Continue to The Venue</button>

    </div>
  )
}

export default Dancer