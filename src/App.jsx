
import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './Welcome'
import Giftdev from './Giftdev'
import Guide from './Guide'
import Spin from './Spin'
import Spinintro from './Spinintro'
import Thanks from './Thanks'
import Others from './Others'
import Pass from './Pass'
import Video from './Video'



const App = () => {
 

  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route index element={<Welcome/>} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/Giftdev' element={<Giftdev />} />
          <Route path='/Pass' element={<Pass />} />
          <Route path='/Guide' element={<Guide/>} />
          <Route path='/Spin' element={<Spin />} />
          <Route path='/Spinintro' element={<Spinintro />} />
          <Route path='/Thanks' element={<Thanks />} />
          <Route path='/Video' element={<Video />} />
          <Route path='/Others' element={<Others />} />

        </Routes>

      </BrowserRouter>
   </div>
  )
}

export default App 
