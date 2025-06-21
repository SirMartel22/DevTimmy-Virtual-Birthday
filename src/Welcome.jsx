import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"
import ReactConfetti from 'react-confetti';

const Welcome = () => {

  const [windowDimension, setDimension] = useState({width: window.innerWidth, height: window.innerHeight})

  const detectSize = () => {
    setDimension ({width: window.innerWidth, height: window.innerHeight})
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)
    return () => {
    window.removeEventListener('resize', detectSize)
      
    }
  }, [windowDimension])
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center space-y-16">
      <ReactConfetti
        width={windowDimension.width}
        height={windowDimension.height}
        tweenDuration={1000} />
        <h2 className="text-5xl text-center leading-[1.2em]">We are <span className="font-bold text-[#f5f5f5] bg-red-900 rounded-md py-1 px-2">Live</span> Now <br /></h2>
      
        <h2 className="text-5xl text-center leading-[1.2em]">Welcome to Official <span className="font-bold text-[#6A9AB0] ">VIRTU FESTIVA</span> Event Platform <br /> 🕺🕺🎶</h2>
        <button className="bg-[#6A80B9] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick = {()=>navigate("/Pass")}> Proceed to Check In </button>
      </div>
  )
}

export default Welcome