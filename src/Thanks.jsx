import React from 'react'
import thank from './assets/thanks.jpg'



const Thanks = () => {

  return (
    <div>
      
      <div className="flex flex-col items-center justify-center gap-16 text-center">

        <div className="w-60 h-60 text-orange-600 mx-auto mt-16">
          <img className="rounded-md w-60 h-60 lg:w-60 lg:h-60 hover:scale-105 transform transition duration-500" src={thank} />
        </div>

        <h2 className="text-4xl">
          Thank You!!!
        </h2> 
        
        <h2>
          Thank you so much for joining DevTimmy’s Virtual Birthday Party. Really glad you made it here today
        </h2>

        <h2>
          One More thing, Pick a form on your way by clicking the below link while checking out
        </h2> 

         <h2>
          The information inside is really important and will help us make a key decision.
        </h2> 

        <a className="bg-[#27548A] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" href="https://forms.gle/Who85YYfZJTpY9n86">Click Here</a>

     
      </div>
    </div>
  )
}

export default Thanks
