import React from 'react'
import image from '../assets/cardImage.jpg'



const Videoform = () => {
  return (
      <div>
          
          <div className="videoform flex flex-col justify-center items-center space-y-24"> 
              
              <div className="video-form-header">
                <h2 className="videohead"> You probably Choose to send DevTimmy Video Message</h2>
              </div>

              <div className="displayCard-Form">
                  
                  <div className="image-file">
                      <img className="shadow-div-shadow-2 w-full lg:w-[50%] rounded-md" src={image} />
                      <h2 className="text-center">Hi Devtimmy 🙌 I Name is gifting you this Video </h2>
            
                  </div>

                <div className="video-form-header">
                    <form action="" method="post">
                        
                        <div>
                            <label htmlFor="name">Name</label>
                            <input placeholder="Kindly enter your name" type="text" />
                        
                        </div>  

                        <div>
                            <label htmlFor="name">Upload the Video you are gifting out</label>
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