import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import html2canvas from 'html2canvas'
import {useNavigate} from 'react-router-dom'    


    const Admin = () => {

        const navigate = useNavigate()
        const [gifts, setGifts] = useState([])
        const [loading, setLoading] = useState(true)

        // Function to fetch data from supabase storage

        const fetchGifts = async () => {
            try {
                const { data, error } = await supabase
                    .from('throwback_gifts')
                    .select('*')
                    .order('created_at', { ascending: false }) //newest first
                
                if (error) throw error

                console.log("Fetched gifts: ", data)
                setGifts(data || [])
            } catch (error) {
                console.error('Error fetching gifts:', error)
            } finally {
                setLoading(false)
            }
        }


        const testRealTime = () => {
            console.log('Testing real-time connections...')
        }
        // Fetch gifts when component Mount

        useEffect(() => {
            // initial fetch
            fetchGifts()
            testRealTime()


            //set up real-time subscription
            const subscription = supabase.channel('throwback_gifts_changes').on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'throwback_gifts'
            },
                (payload) => {
                    console.log('New gift received!', payload)
                    console.log('Payload new', payload.new)

                    // Add the new gift to the existing list
                    setGifts(currentGifts => [payload.new, ...currentGifts])
                }
            )
                .subscribe((status) => {
                    console.log('Subscription status: ', status)
                })
            
            //Clean up subscription when component unmounts
            return () => {
                console.log('Unsubscribing...')
                // subscription.unsubscribe()
                supabase.removeChannel(subscription)
            }
        }, [])

        if (loading) {
            return <div>Loading throwback gifts...</div>
        }


        const downloadCard = async (gift) => {
            try {
                console.log('Downloading card for: ', gift.name)
                
                //Find the card element by its ID
                const cardElement = document.getElementById(`card-${gift.id}`)

                if (!cardElement) {
                    alert('card element not found')
                    return
                }

                //Find the download button inside the card and hide it
                const downloadBtn = cardElement.querySelector('.download-btn')
             
                if (downloadBtn) downloadBtn.style.display = 'none'
                //Convert the card to canvas
                const canvas = await html2canvas(cardElement, {
                    background: '#4E6688',
                    scale: 2, //Higher quality
                    useCORS: true,//Handle cross-origin images
                    allowTaint: true
                })

                //Restor the button's display
                if (downloadBtn) downloadBtn.style.display = 'block'


                // convert canvas to blob and download
                canvas.toBlob((blob) => {
                    const url = window.URL.createObjectURL(blob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `throwback-card${gift.name}-${gift.id}.png`

                    document.body.appendChild(link);
                    link.click()

                    // cleanup
                    document.body.removeChild(link)
                    window.URL.revokeObjectURL(url)

                    console.log('Card download completed!')
                    
                })
            } catch (error) {
                console.error('Download failed: ', error)
                alert('Download failed. Please try again.')
        }
        }
        
        if (loading) {
            return <div>Loading throwback gifts...</div>
        }

    return (
        <div className="p-8">
            <h1 className = "text-3xl font-bold text-center mb-8">
                Messages and Throwback page
            </h1>

            <p className="text-1xl font-bold text-center mb-8"> After Downloading your Message Pick a Gift for Yourself At the bottom of the page. </p>
        
            {gifts.length === 0 ? (
                <p className="text-center, text-gray-500"> No throwback gifts yet!</p>
            ) : (
                    <div className="grid grid-cols-1 md:grid-cols lg:grid-cols-3 gap-6">
                        {gifts.map((gift) => (
                            //   console.log(gift)
                            
                            <div key={gift.id} id={`card-${gift.id}`} className="bg-hero bg-opacity-60 flex flex-col items-center justify-center gap-4 rounded-lg shadow-lg p-4 ">
                                {gift.image_url ? (
                                    <img
                                        src={gift.image_url}
                                        alt={`Throwback from ${gift.name}`}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                ) : (
                                        <div className="w-full h-auto flex- items-center justify-center rounded-lg mb-4 bg-gradient-to-r from-[#332D56] to-[#001f54] text-center p-4">
                                            {gift.message_body || "No message provided."}
                                        </div>
                                )}

                                <h3 className="text-lg font-semibold">{gift.name} Sent This</h3>
                                <p className="text-sm text-white-500">
                                    {new Date(gift.created_at).toLocaleDateString()}
                                </p>

                                <p className="text-sm text-white-500 pt-8">
                                    #Virtual_Festivity_25
                                </p>

                              <button
                                    onClick={() => downloadCard(gift)}
                                    className="download-btn w-full bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded-md transition duration-300"
                                >
                                    Download Image
                                </button>
                            </div>
                        ))}
                    </div>


            )}
            <button className="bg-[#27548A] py-4 px-8 mt-24 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300"  onClick={()=>navigate('../Spinintro')}>Pick a gift for yourself</button>
        </div>
    )
    }

    export default Admin
