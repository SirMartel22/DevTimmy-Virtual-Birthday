
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


const App = () => {
 

  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route index element={<Welcome/>} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/Giftdev' element={<Giftdev />} />
          <Route path='/Guide' element={<Guide/>} />
          <Route path='/Spin' element={<Spin />} />
          <Route path='/Spinintro' element={<Spinintro />} />
          <Route path='/Thanks' element={<Thanks />} />
          <Route path='/Others' element={<Others />} />

        </Routes>

      </BrowserRouter>
   </div>
  )
}

export default App 
