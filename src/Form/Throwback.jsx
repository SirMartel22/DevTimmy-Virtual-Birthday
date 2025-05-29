import React from 'react'
import image from '../assets/cardImage.jpg'

// import ImageUpload  from './ImageUpload'

const Throwback = () => {

  return (
      <div>
          
          <div className="throwbackform flex flex-col justify-center items-center space-y-24">
              
              <div className="throwback-form-header">
                <h2 className="videohead text-3xl"> You wanna send a throwback picture? No problem </h2>
              </div>

              <div className="displayCard-Form lex flex-col lg:flex lg:flex-row md:flex md:flex-col justify-center items-center space-x-12">
                  
                  <div className="image-file flex flex-col shadow-div-shadow items-center justify-center bg-[#4E6688] py-12 px-8 space-y-8 lg:w-[400px] rounded-md transform hover:scale-105 transition duration-500">
                      <img className="shadow-div-shadow-2 w-full lg:w-[50%] rounded-md" src={image} />
                      <h2 className="text-center">Hi Devtimmy 🙌 I Name is gifting you this Audio </h2>

                  </div>

                <div className="throwback-form-header">
                    <form action="" method="post" className="space-y-4">
                        
                        <div>
                            <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Name: </label>
                            <input 
                              name="name"
                              id="name"
                              placeholder="Kindly enter your name" 
                              type="text" 
                              onChange=""
                              className="bg-transparent w-[70%] border border-1 border-[#4E6688] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4"
                            />
                        </div>  

                        <div>
                            <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Throwback Picture Here</label>
                            <imageUpload onImageUploaded=""/>
                            <input placeholder="Upload the Throwback picture here" type="file" accept="image/*"  id="ThrowbackUpload"/>
                        
                        </div>  
                    </form>
                </div>

        </div>
            <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" > Send Gift to DevTimmy </button>

          </div>
        </div>
  )
}

export default Throwback