
import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './Welcome'
import Giftdev from './Giftdev'
import Spin from './Spin'
import Spinintro from './Spinintro'
import Thanks from './Thanks'
import Pass from './Pass'
import Video from './Video'
import Audio from './Form/Audio'
import Message from './Form/Message'
import Videoform from './Form/Videoform'
import Throwback from './Form/Throwback'
import Admin from './Admin/Admin'
import Unused from './Admin/Unused'

// import animatedBg from './assets/animated-bg.mp4'




const App = () => {
 

  return (
    <div>
    {/* <div className="relative h-screen w-full overflow-hidden"> */}
      {/* Video Background */}
    {/* //   <video autoplay muted loop playsInline className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
    //     <source src={animatedBg} type="video/mp4" />
    //       Your Browser does not support the Video tag.

    //   </video> */}
      
      <BrowserRouter>
        <Routes>
          <Route index element={<Welcome/>} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/Giftdev' element={<Giftdev />} />
          <Route path='/Pass' element={<Pass />} />
          <Route path='/Spin' element={<Spin />} />
          <Route path='/Spinintro' element={<Spinintro />} />
          <Route path='/Thanks' element={<Thanks />} />
          <Route path='/Video' element={<Video />} />
          <Route path='/Form/Audio' element={<Audio />} />
          <Route path='/Form/Videoform' element={<Videoform />} />
          <Route path='/Form/Message' element={<Message />} />
          <Route path='/Form/Throwback' element={<Throwback />} />
          <Route path='/Admin/Admin' element={<Admin />} />
          <Route path='/Admin/Unused' element={<Unused />}/>
          
        </Routes>

      </BrowserRouter>
   </div>
  )
}

export default App 
