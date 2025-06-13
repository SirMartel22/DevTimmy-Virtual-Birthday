import React, { useState } from 'react'
import image from '../assets/cardImage.jpg'
import { saveTextMessage } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'



const Message = () => {

  const navigate = useNavigate()
 

  const [name, setName] = useState('');
  const [sugarMessage, setSugarMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

 
  //save message to datanase
  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    if (!name.trim() || !sugarMessage.trim()) {
      setErrorMessage('Please fill in both name and message fields')
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await saveTextMessage(name.trim(), sugarMessage.trim());

      if (result.success) {
        setSuccessMessage('Your sugar message has been sent to DevTimmy 🎉')
        
        //clear form
        setName('');
        setSugarMessage('');
      } else {
        setErrorMessage('Failed to send message: ' + result.error)
      }
    } catch (error) {
      setErrorMessage('An Error occured while sending your message');
      console.error('Submit error ', error);
    } finally {
      setLoading(false)
    }
  }


  return (
      <div>
          
  <div className="messageform flex flex-col justify-center items-center space-y-24">
      
      <div className="message-form-header">
        <h2 className="message-head text-3xl"> Is it a Sugar Message you want to send, no problem </h2>
      </div>

      <div className="displayCard-Form flex flex-col lg:flex lg:flex-row md:flex md:flex-col gap-16 justify-center items-center space-x-12">
          
          <div className="image-file flex flex-col shadow-div-shadow items-center justify-center bg-[#4E6688] py-12 px-8 space-y-8 lg:w-[400px] rounded-md transform hover:scale-105 transition duration-500">
            {sugarMessage.trim() === '' ? (
              <img className="shadow-div-shadow-2 w-full lg:w-[50%] rounded-md" src={image} />
            ) : (
                <div className="text-lg w-full lg:w-[90%] rounded-mg"> {sugarMessage} </div>
            )}  
              <h2 className="text-center">Hi Devtimmy 🙌 {name || 'Someone'} is sending you this sugar cube message </h2>
    
          </div>

        <div className="message-form-header">
            <form className="space-y-4" onSubmit={handleSubmit}>
                
                <div>
                    <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Name: </label>
                    <input
                        className="bg-transparent w-[70%] border border-1 border-[#4E6688] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4"
                        placeholder="Kindly enter your name"
                        type="text"
                        value={name}
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        disabled = {loading}
                      />
                </div>  

                <div>
                      <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">
                          Send message to DevTimmy:
                          
                    </label>
                    <textarea
                        className="bg-transparent w-[85%] border border-1 border-[#4E6688] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4"
                        placeholder="Sugar Message here"
                        type="text"
                        id="sugarMessage"
                        value={sugarMessage}
                        onChange={(e) => setSugarMessage(e.target.value)}
                        disabled={loading}
                      />
                                
                      </div>  
                                  
                      {/* Success Message */}
                      {successMessage && (
                        <div className="text-green-500 text-center py-2" >
                          {successMessage}
                        </div>
                      )}
                      
                      {/* Error Message */}
                      {errorMessage && (
                        <div className="text-red-500 text-center py-2" >
                          {errorMessage}
                        </div>
                      )}
              

                      <button
                        className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"
                        type='submit'
                        disabled={loading}
                        
                      >
                        {loading ? 'Sending...' : 'Send Gift to DevTimmy'}
                      </button>
                </form>
            </div>
        </div>


              <div className="next-prev-btn flex flex-col lg:flex lg:flex-row items-center justify-center space-y-16 lg:space-x-24 lg:space-y-0">
                <button className="bg-[#6A80B9] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick ={()=>navigate('/GiftDev')}> Return to Previous Page</button>
                <button className="bg-[#27548A] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"  onClick={()=>navigate('/Spinintro')}>Pick a gift for yourself</button>
              </div>
      </div>
    </div>
)
}

export default Message;