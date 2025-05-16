import React from 'react'
import { useNavigate } from "react-router-dom"

const Welcome = () => {

  const navigate = useNavigate()
  return (
      <div>
      <h2>Welcome to DevTimmy Virtual Birthday Party!!!</h2>
      <button onClick = {()=>navigate("/Giftdev")}>We are Going GiftDev Page</button>
      </div>
  )
}

export default Welcome