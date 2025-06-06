import React, { useState } from 'react'
import { supabase, uploadImage } from '../supabaseClient'
import cardImage from '../assets/cardImage.jpg'
import { useNavigate } from 'react-router-dom'

// import ImageUpload  from './ImageUpload'

const Throwback = () => {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState(null)


  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
      if (file) {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      //step 1: Upload the image
      console.log('Sending image...')
      const imageData = await uploadImage(image)

      //step 2: Get the public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('throwback-images')
        .getPublicUrl(imageData.path)
    
      console.log('About to insert:', { name, image_url: publicUrl })
      console.log("Image data recieved:", imageData);

      //Step 3: Save to database
    console.log('Saving to database...')
      const { data, error } = await supabase
      .from('throwback_gifts')
      .insert([
        {
          name: name,
          image_url: publicUrl
        }
      ])

    if (error) throw error
  
    console.log('Success!', data)
    setMessage('Gift sent successfully! 🎉')

    //reset form
    setName('')
    setImage(null)

      document.getElementById('ThrowbackUpload').value = '';
    //reset file input
    e.target.reset()

    console.log('Name', name)
    console.log('Image', image)
  } catch (error) {
    console.error('Error:', error.message)
    setMessage('Error:' + error.message)
  } finally {
    setLoading(false)
  }
}
  
    return (
      <div>
          
        <div className="throwbackform flex flex-col justify-center items-center space-y-24">
              
          <div className="throwback-form-header">
            <h2 className="videohead text-3xl"> You wanna send a throwback picture? No problem </h2>
          </div>

          <div className="displayCard-Form lex flex-col lg:flex lg:flex-row md:flex md:flex-col justify-center items-center space-x-12">
                  
            <div className="image-file flex flex-col shadow-div-shadow items-center justify-center bg-[#4E6688] py-12 px-8 space-y-8 lg:w-[400px] rounded-md transform hover:scale-105 transition duration-500">
             
              <img className="shadow-div-shadow-2 w-full lg:w-[90%] rounded-md" src={preview || cardImage} />
            
              <h2 className="text-center">{`Hi Devtimmy 🙌  ${name} is gifting you this Throwback `}</h2>

            </div>

            <div className="throwback-form-header">
              <form action="" method="post" className="space-y-4" onSubmit={handleSubmit}>
                        
                <div>
                  <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Name: </label>
                  <input
                    name="name"
                    id="name"
                    value={name}
                    placeholder="Kindly enter your name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent w-[70%] border border-1 border-[#4E6688] rounded-md ring-0 focus:ring-2  focus:outline-none py-2 px-4"
                  />
                </div>

                <div>
                  <label className="text-1xl lg:text-2xl md:text-2xl" htmlFor="name">Throwback Picture Here</label>
                  {/* <imageUpload onImageUploaded="" /> */}
                  <input
                    placeholder="Upload the Throwback picture here"
                    type="file"
                    accept="image/*"
                    id="ThrowbackUpload"
                    onChange={handleImageChange}
                    required
                  />
                        
                </div>
                <button type="submit" disabled={loading} className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" >
                  {loading ? 'sending...' : 'send Gift to DevTimmy'}
                </button>
              </form>
              {message && <p style={{ marginTop: '15px', color: 'green' }}>{ message }</p>}
            </div>

          </div>

           <div className="next-prev-btn flex flex-col lg:flex lg:flex-row items-center justify-center space-y-16 lg:space-x-24 lg:space-y-0">
              <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"  onClick={()=>navigate('/Spinintro')}>Pick a gift for yourself</button>
              <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick ={()=>navigate('/GiftDev')}> Return to Previous Page</button>
          </div>
          
        </div>
      </div>
    )

  }


export default Throwback