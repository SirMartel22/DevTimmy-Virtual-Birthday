import React, {useState} from 'react'
import image from '../assets/cardImage.jpg'
import { supabase, uploadAudio } from '../supabaseClient'
import { useNavigate } from "react-router-dom"
// import { useDropZone } from 'react-dropZone'


const Audio = () => {

    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false)
    const [audio, setAudio] = useState(null);
    const [message, setMessage] = useState('');


    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        setAudio(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
    
 
        try {
            //step1: Upload the video
            console.log('Yo!!! Your Video is sending...')
            const audioData = await uploadAudio(audio)

            //step 2: Get The public url of the uploaded video
            const { data: { publicUrl } } = supabase.storage
                .from('throwback-images')
                .getPublicUrl(audioData.path)
        
            console.log("About to insert video: ", { name, audio_url: publicUrl });
            console.log("Video data received: ", audioData);

            //Step 3: Save to database
            console.log("Saving to Database...")
            const { data, error } = await supabase
                .from('throwback_gifts')
                .insert([
                    {
                        name: name,
                        audio_url: publicUrl
                }
                ])
            if (error) throw error

            console.log('Success!', data)
            setMessage('Yo!! Audio sent Successfully! 🎉')

            //reset form
            setName('');
            setAudio(null)

            document.getElementById('audioUpload').value = "";

            //reset file input
            e.target.reset()

            console.log('Name ', name)
            console.log('Audio ', audio)
        } catch (error) {
            console.error('Error: ', error.message)
            setMessage("Error: " + error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
      <div>
          
          <div className="audioform flex flex-col justify-center items-center space-y-24">
              
              <div className="audio-form-header">
                  <h2 className="audiohead text-3xl"> Send Audio Message to DevTimmy </h2>
              </div>

              <div className="displayCard-Form flex flex-col lg:flex lg:flex-row md:flex md:flex-col justify-center items-center space-x-12">
                   
                  <div className="image-file flex flex-col shadow-div-shadow items-center justify-center bg-[#4E6688] py-12 px-8 space-y-8 lg:w-[400px] rounded-md transform hover:scale-105 transition duration-500">
                      <img className="shadow-div-shadow-2 w-full lg:w-[50%] rounded-md" src={ image } />
                      <h2 className="text-center">{`Hi Devtimmy 🙌 ${ name } is singing for you`}</h2>
            
                  </div>

                <div className="audio-form-header ">
                    <form action="" method="post" className="space-y-4" onSubmit={handleSubmit}>
                        
                        <div>
                            <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Name: </label>
                              <input
                                  className="bg-transparent w-[70%] border border-1 border-[#4E6688] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4"
                                  placeholder="Kindly enter your name"
                                  type="text"
                                  onChange={(e) => setName(e.target.value)}
                              />
                        
                        </div>  

                        <div>
                            <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Upload Audio Here:</label>
                              <input
                                  placeholder="Kindly enter your name"
                                  type="file"
                                  accept="audio/*"
                                  id="audioUpload"
                                  onChange={handleAudioChange}
                              />
                        
                        </div>  
                          <button
                              className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"
                              disabled={loading}
                              type="submit"
                          >
                              {loading ? 'Audio is been sent...' : 'Send Audio to DevTimmy'}
                          </button>
                          {message && <p style={{ marginTop: '15px', color: 'green' }}> {message}</p>}
                    </form>
                </div>

              </div>

            <p className="font-bold text-center"> Download Not Available for this, But DevTimmy is going to get your message</p>

               <div className="next-prev-btn flex flex-col lg:flex lg:flex-row items-center justify-center space-y-16 lg:space-x-24 lg:space-y-0">
                <button className="bg-[#6A80B9] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick ={()=>navigate('/GiftDev')}> Return to Previous Page</button>
                <button className="bg-[#27548A]  py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"  onClick={()=>navigate('/Spinintro')}>Pick a Gift for Yourself </button>
              </div>
        
              

          </div>
        </div>
  )
}

export default Audio