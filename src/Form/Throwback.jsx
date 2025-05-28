import React from 'react'
// import ImageUpload  from './ImageUpload'

const Throwback = () => {

  return (
      <div>
          
          <div className="throwbackform">
              
              <div className="throwback-form-header">
                <h2 className="videohead"> You wanna send a throwback picture? No problem </h2>
              </div>

              <div className="displayCard-Form">
                  
                  <div className="image-file">
                        <img src="" />
                  </div>

                <div className="throwback-form-header">
                    <form action="" method="post">
                        
                        <div>
                            <label htmlFor="name">Name</label>
                            <input 
                              name="name"
                              id="name"
                              placeholder="Kindly enter your name" 
                              type="text" 
                              onChange = ""
                            />
                        </div>  

                        <div>
                            <label htmlFor="name">Throwback Picture Here</label>
                            <imageUpload onImageUploaded=""/>
                            <input placeholder="Upload the Throwback picture here" type="file" accept="image/*"  id="ThrowbackUpload"/>
                        
                        </div>  
                    </form>
                </div>

            </div>
          </div>
        </div>
  )
}

export default Throwback