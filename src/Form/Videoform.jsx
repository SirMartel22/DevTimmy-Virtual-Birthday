import React from 'react'
import image from '../assets/cardImage.jpg'



const Videoform = () => {
  return (
      <div>
          
          <div className="videoform flex flex-col justify-center items-center space-y-24"> 
              
              <div className="video-form-header">
                <h2 className="videohead text-3xl"> You probably Choose to send DevTimmy Video Message</h2>
              </div>

              <div className="displayCard-Form flex flex-col lg:flex lg:flex-row md:flex md:flex-col justify-center items-center space-x-12">
                  
                  <div className="image-file flex flex-col shadow-div-shadow items-center justify-center bg-[#4E6688] py-12 px-8 space-y-8 lg:w-[400px] rounded-md transform hover:scale-105 transition duration-500">
                      <img className="shadow-div-shadow-2 w-full lg:w-[50%] rounded-md" src={image} />
                      <h2 className="text-center">Hi Devtimmy 🙌 I Name is gifting you this Video </h2>
            
                  </div>

                <div className="video-form-header">
                    <form action="" method="post">
                        
                        <div>
                            <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Name: </label>
                            <input  className="bg-transparent w-[70%] border border-1 border-[#4E6688] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4" placeholder="Kindly enter your name" type="text" />
                        
                        </div>  

                        <div>
                            <label  className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Upload Video</label>
                            <input placeholder="Upload the Video here" type="file" accept="video/*"  id="videoUpload"/>
                        
                        </div>  
                    </form>
                </div>

        </div>
            <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" > Send Gift to DevTimmy </button>
        
          </div>
        </div>
  )
}

export default Videoform