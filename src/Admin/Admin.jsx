import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import html2canvas from 'html2canvas'


const Admin = () => {

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

            //Convert the card to canvas
            const canvas = await html2canvas(cardElement, {
                background: '#4E6688',
                scale: 2, //Higher quality
                useCORS: true,//Handle cross-origin images
                allowTaint: true
            })

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
              Throwback Gifts for DevTimmy
          </h1>
      
          {gifts.length === 0 ? (
              <p className="text-center, text-gray-500"> No throwback gifts yet!</p>
          ) : (
                  <div className="grid grid-cols-1 md:grid-cols lg:grid-cols-3 gap-6">
                      {gifts.map((gift) => (
                        //   console.log(gift)
                          <div key={gift.id} id={`card-${gift.id}`} className="bg-[#4E6688] rounded-lg shadow-lg p-4">
                              <img
                                  src={gift.image_url}
                                  alt={`Throwback from ${gift.name}`}
                                  className="w-full h-48 object-cover rounded-lg mb-4"
                              />
                              <h3 className="text-lg font-semibold">From: {gift.name}</h3>
                              <p className="text-sm text-gray-500">
                                  {new Date(gift.created_at).toLocaleDateString()}
                              </p>

                              {/* Download Button */}
                              <button
                                  onClick={() => downloadCard(gift)}
                                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
                              >
                                  Download Image
                              </button>
                          </div>
                      ))}
                  </div>
          )}
    </div>
  )
}

export default Admin
