
import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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
        <Switch>
          <Route index component={Welcome} />
          <Route path='/welcome' component={Welcome} />
        </Switch>

      </BrowserRouter>
   </div>
  )
}

export default App 
