import React from 'react'
import { useNavigate } from "react-router-dom"

const Welcome = () => {

  const navigate = useNavigate()
  return (
      <div className="flex flex-col justify-center items-center space-y-24">
        <h2 className="text-5xl text-center">Welcome to <span className="font-bold text-[#6A9AB0]">DEVTIMMY</span> Virtual Birthday Party 🕺🕺🎶</h2>
        <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick = {()=>navigate("/Pass")}> Continue </button>
      </div>
  )
}

export default Welcome