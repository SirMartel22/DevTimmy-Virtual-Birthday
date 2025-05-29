import React from 'react'
import image from '../assets/cardImage.jpg'

const Message = () => {
  
  return (
      <div>
          
          <div className="messageform flex flex-col justify-center items-center space-y-24">
              
              <div className="message-form-header">
                <h2 className="message-head text-3xl"> Is it a Sugar Message you want to send, no problem </h2>
              </div>

              <div className="displayCard-Form flex flex-col lg:flex lg:flex-row md:flex md:flex-col gap-16 justify-center items-center space-x-12">
                  
                  <div className="image-file flex flex-col shadow-div-shadow items-center justify-center bg-[#4E6688] py-12 px-8 space-y-8 lg:w-[400px] rounded-md transform hover:scale-105 transition duration-500">
                      <img className="shadow-div-shadow-2 w-full lg:w-[50%] rounded-md" src={image} />
                      <h2 className="text-center">Hi Devtimmy 🙌 I Name is sending you this sugar cube message </h2>
            
                  </div>

                <div className="message-form-header">
                    <form className="space-y-4" action="" method="post">
                        
                        <div>
                            <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Name: </label>
                            <input className="bg-transparent w-[70%] border border-1 border-[#4E6688] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4" placeholder="Kindly enter your name" type="text" />
                        </div>  

                        <div>
                              <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">
                                 Send message to DevTimmy:
                                  
                            </label>
                            <textarea className="bg-transparent w-[85%] border border-1 border-[#4E6688] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4"  placeholder="Sugar Message here" type="text" id="sugarMessage"/>
                        
                        </div>  
                    </form>
                </div>

        </div>
        
            <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"> Send Gift to DevTimmy </button>

          </div>
        </div>
  )
}

export default Message;