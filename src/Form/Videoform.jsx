import React from 'react'

const Videoform = () => {
  return (
      <div>
          
          <div className="videoform">
              
              <div className="video-form-header">
                <h2 className="videohead"> You probably Choose to send DevTimmy Video Message</h2>
              </div>

              <div className="displayCard-Form">
                  
                  <div className="image-file">
                        <img />
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
          </div>
        </div>
  )
}

export default Videoform