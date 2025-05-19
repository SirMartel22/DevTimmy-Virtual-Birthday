import React from 'react'
// import { useDropZone } from 'react-dropZone'


const Audio = () => {

  return (
      <div>
          
          <div className="audioform">
              
              <div className="audio-form-header">
                <h2 className="audiohead"> You probably Choose to send DevTimmy Audio Message</h2>
              </div>

              <div className="displayCard-Form">
                   
                  <div className="image-file">
                        <img />
                  </div>

                <div className="audio-form-header">
                    <form action="" method="post">
                        
                        <div>
                            <label htmlFor="name">Name</label>
                            <input placeholder="Kindly enter your name" type="text" />
                        
                        </div>  

                        <div>
                            <label htmlFor="name">Upload the Audio you are giving out</label>
                            <input placeholder="Kindly enter your name" type="file" accept="audio/*"  id="audioUpload"/>
                        
                        </div>  
                    </form>
                </div>

            </div>
          </div>
        </div>
  )
}

export default Audio