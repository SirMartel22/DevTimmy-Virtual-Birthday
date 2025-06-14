
import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Coming from './Coming'
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
import Cake from './Gifts/Cake'
import Candle from './Gifts/Candle'
import Confetti from './Gifts/Confetti'
import Dancer from './Gifts/Dancer'
import Giftbox from './Gifts/Giftbox'
import Karaoke from './Gifts/Karaoke'
import Megaphone from './Gifts/Megaphone'
import Meme from './Gifts/Meme'
import Shout from './Gifts/Shout'
import Superfan from './Gifts/Superfan'


// import Converter from './Admin/Converter'


const App = () => {
 

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Coming/>} />
          {/* <Route index element={<Welcome/>} /> */}
          <Route path='/welcome' element={<Coming />} />
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
          <Route path='/Admin/Unused' element={<Unused />} />
          <Route path='/Gifts/Cake' element={<Cake />} />
          <Route path='/Gifts/Candle' element={<Candle />} />
          <Route path='/Gifts/Cake' element={<Cake />} />
          <Route path='/Gifts/Cake' element={<Cake />} />
          <Route path='/Gifts/Cake' element={<Cake />} />
          <Route path='/Gifts/Cake' element={<Cake />} />
          <Route path='/Gifts/Candle' element={<Candle />} />
          <Route path='/Gifts/Confetti' element={<Confetti />} />
          <Route path='/Gifts/Dancer' element={<Dancer />} />
          <Route path='/Gifts/Giftbox' element={<Giftbox />} />
          <Route path='/Gifts/Karaoke' element={<Karaoke />} />
          <Route path='/Gifts/Megaphone' element={<Megaphone />} />
          <Route path='/Gifts/Meme' element={<Meme />} />
          <Route path='/Gifts/Shout' element={<Shout />} />
          <Route path='/Gifts/Superfan' element={<Superfan />} />
          
        </Routes>

      </BrowserRouter>
   </div>
  )
}

export default App 
