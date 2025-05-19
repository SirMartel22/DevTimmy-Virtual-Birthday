import React from 'react'

const Message = () => {
  return (
      <div>
          
          <div className="messageform">
              
              <div className="message-form-header">
                <h2 className="message-head"> Is it a Sugar Message you want to send, no problem </h2>
              </div>

              <div className="displayCard-Form">
                  
                  <div className="image-file">
                        <img src="" />
                  </div>

                <div className="message-form-header">
                    <form action="" method="post">
                        
                        <div>
                            <label htmlFor="name">Name</label>
                            <input placeholder="Kindly enter your name" type="text" />
                        </div>  

                        <div>
                              <label htmlFor="name">
                                  Kindly use the space below to write sugar message to DevTimmy
                                  
                            </label>
                            <input placeholder="Sugar Message here" type="text" id="sugarMessage"/>
                        
                        </div>  
                    </form>
                </div>

            </div>
          </div>
        </div>
  )
}

export default Message;