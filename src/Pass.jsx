import React from 'react';

import {useNavigate} from "react-router-dom"

const Pass = () => {

    const navigate = useNavigate()
  return (
      <div className="form-container">
      <div className="form">

        <div className ="description">
          <h2 className="font-bold text-5xl">Kindly Provide Your Pass</h2>
          <p> Please give my bouncer a gate pass so he doesn’t start flexing unnecessary power 😂</p>
        </div>

        <div>
          <img src="https://media.giphy.com/media/s0Ils0TIVZ5Fm/giphy.gif?cid=ecf05e47gwrn95wjkshhxaj5g9kk5h3tvj7gocxbauyq4p42&ep=v1_gifs_related&rid=giphy.gif&ct=g"/>
        </div>
              
              <form className = "">
                <div className ="name">
                  <label htmlFor="name">Name</label>
                  <input name="name" type="text" placeholder="Kindly enter your name "/>
                </div>
          
                  <div className ="name">
                    <label htmlFor="name">Who invited you</label>
                    <input name="name" type="text" placeholder="Enter the person that invited you "/>
                </div>
                
                <div className ="name">
                            
                  </div>
              

              </form>
              
          </div>
          

          <button className="" onClick ={()=>navigate('/Video')}> Continue to The Venue</button>

      
    </div>
  );
}

export default Pass;
