import React, { useState } from 'react'
import image from '../assets/cardImage.jpg'
import { supabase, uploadVideo } from '../supabaseClient'
// 


const Videoform = () => {

    const [name, setName] = useState('')
    const [video, setVideo] = useState(null)
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVideoChange = (e) => {
        const file = e.target.files[0]
        setVideo(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        setMessage('')

        try {
            //step 1: upload the video
            const videoData = await uploadVideo(video)

            //step 2: Get the public url of the uploaded video
            const { data: { publicUrl } } = supabase.storage
                .from('throwback-images')
                .getPublicUrl(videoData.path)
            
            console.log('About to insert Video: ', { name, video_url: publicUrl })
            console.log("Video Data Recieved: ", videoData);

            //step 3: Save to database
            console.log("Saving to database...")
            const { data, error } = await supabase
                .from('throwback_gifts')
                .insert([
                    {
                        name: name,
                        video_url: publicUrl
                    }
                ])
            
            if (error) throw error

            console.log('Success!', data)
            setMessage('Gift sent successfully! 🎉')

            //reset form
            setName('')
            setVideo(null)

            document.getElementById('videoUpload').value = "";

            //reset file input
            e.target.reset();

            console.log('Name', name);
            console.log('Image', video);
        } catch (error) {
            console.error('Error: ', error.message)
            setMessage('Error: ' + error.message)
        } finally {
            setLoading(false)
        }
    }
  return (
      <div>
          
          <div className="videoform flex flex-col justify-center items-center space-y-24"> 
              
              <div className="video-form-header">
                <h2 className="videohead text-3xl"> You probably Choose to send DevTimmy Video Message</h2>
              </div>

              <div className="displayCard-Form flex flex-col lg:flex lg:flex-row md:flex md:flex-col justify-center items-center space-x-12">
                  
                  <div className="image-file flex flex-col shadow-div-shadow items-center justify-center bg-[#4E6688] py-12 px-8 space-y-8 lg:w-[400px] rounded-md transform hover:scale-105 transition duration-500">
                      <img className="shadow-div-shadow-2 w-full lg:w-[50%] rounded-md" src={image} />
                      <h2 className="text-center">{`Hi Devtimmy 🙌 ${ name } is gifting you this Video` }</h2>
            
                  </div>

                <div className="video-form-header">
                    <form action="" method="post" className="space-y-4" onSubmit={handleSubmit}>
                        
                        <div>
                            <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Name: </label>
                              <input
                                  className="bg-transparent w-[70%] border border-1 border-[#4E6688] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4"
                                  placeholder="Kindly enter your name"
                                  type="text"
                                  onChange = {(e) => setName(e.target.value)}
                              />
                        
                        </div>  

                        <div>
                            <label  className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Upload Video</label>
                              <input
                                  placeholder="Upload the Video here"
                                  type="file"
                                  accept="video/*"
                                  id="videoUpload"
                                  onChange={handleVideoChange}
                              />
                        
                        </div>  
                          <button
                              className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"
                               disabled={loading}
                          >
                              {loading ? 'Sending....' : 'Send Video to DevTimmy'}
                          </button>
                          {message && <p style={{ marginTop: "15px", color: 'green' }}>{message}</p>}
                    </form>
                </div>

        </div>
        
          </div>
        </div>
  )
}

export default Videoform