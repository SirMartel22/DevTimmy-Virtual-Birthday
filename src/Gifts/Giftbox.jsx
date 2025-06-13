import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import html2canvas from 'html2canvas'
import ReactConfetti from 'react-confetti'
import { CakeSlice } from "lucide-react"
import award from '../assets/award.png'
import giftbox from '../assets/giftbox.jpg'



const Giftbox = () => {
   // This code section for confetti dropdown
    const [windowDimension, setDimension] = useState({ width: window.innerWidth, height: window.innerHeight })
    
    const detectSize = () => {
        setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    useEffect(() => {
        window.addEventListener('resize', detectSize);
        return () => {
            window.removeEventListener('resize', detectSize)
        }
    }, [windowDimension])

    // navigation code

    // downloading the card code
    const downloadCard = async() => {
        try {
            console.log('Downloading...')

           

            const cardElement = document.getElementById('gift-card');
            console.log(cardElement)

             // find the download button inside the card element and hide it
            const downloadBtn = cardElement.querySelector('.download-btn');
            console.log(downloadBtn)
            if (downloadBtn) downloadBtn.style.display = 'none';

            // convert the card to canvas for download
            const canvas = await html2canvas(cardElement, {
                scale: 2,
                useCORS: true,
                allowTaint: true
            });

            // convert canvas to blob and download
            canvas.toBlob((blob) => {

                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a')
                link.href = url
                link.download = "Your download"
                
                document.body.appendChild(link);
                link.click()
    
                //cleanUp 
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url)
    
                console.log('Card downloaded')
            })

             // restore the buttons's display
            if (downloadBtn) downloadBtn.style.display = "block";

        } catch (error) {
            alert("download failed: ")
            console.log("download failed: ", error)

        }
    }
  const navigate = useNavigate()
  return (
      <div className="flex flex-col items-center justify-center text-center">
          <ReactConfetti
              width={windowDimension.width}
              height={windowDimension.height}
              tweenDuration = {1000}
          />
          
          <h2 className="font-bold text-2xl text-center py-8"> Congratulations!!! You won this Gift at DevTimmy's Birthday Party, Enjoy</h2>
          <h4> You can download it and post on your status as an evidence that you showed up</h4>
        
    {/* <!-- Content area --> */}
    <div class="relative z-10 min-h-screen flex items-center justify-center p-8 items-center pb-12">
        
        <div id="gift-card"  class="bg-white/80 backdrop-blur-sm rounded-md p-8 max-w-md w-full text-center shadow-xl">
            {/* <!-- Candle icon --> */}
            <div class="mb-6">
                      
                
            <div class="w-16 h-1 mx-auto bg-cyan-100 rounded-full flex items-center justify-center">
                    {/* <!-- Background container --> */}
                <div class="fixed inset-0 -z-10 overflow-hidden">
                    {/* <!-- Large blob top-left --> */}
                    <div class="absolute -top-32 -left-32 w-96 h-96 bg-cyan-200/60 rounded-full blob-1">
                    </div>
                    
                    {/* <!-- Medium blob top-center --> */}
                    <div class="absolute -top-16 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-cyan-100/80 rounded-full blob-2"></div>
                    
                    {/* <!-- Small blob bottom-right --> */}
                    <div class="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-200/50 rounded-full blob-3"></div>
                    
                    {/* <!-- Additional subtle blob --> */}
                    <div class="absolute top-1/3 -left-20 w-48 h-48 bg-cyan-100/40 rounded-full blob-4"></div>
                    
                    {/* <!-- Extra decorative elements --> */}
                    <div class="absolute top-2/3 right-1/4 w-32 h-32 bg-cyan-50/60 rounded-full"></div>
                    <div 
                    class="absolute bottom-1/4 left-1/3 w-24 h-24 bg-cyan-100/30 rounded-full"></div>
                </div>
                </div>
                    <div className="w-32 h-32 text-cyan-600 mx-auto ">
                         <img className="rounded-md w-32 h-32 lg:w-32 lg:h-32 hover:scale-105 transform transition duration-500" src={giftbox} />

                  </div>
                  </div>
                  
                 
            
            <h1 class="text-3xl font-bold text-cyan-600 mb-6">Gift Giver Extraordinaire</h1>
            
            <p class="text-gray-700 text-lg mb-8 font-bold">Your combo of generosity and grammar deserves its own department. Respect, O Minister!🎁🙌👏</p>
            
            {/* <!-- Candle icon in content --> */}
                    <div class="mb-4 flex flex-col items-center justify-center">
                            <img className="rounded-md w-24 h-24 lg:w-24 lg:h-24 hover:scale-105 transform transition duration-500" src={award} />
                    </div>

                  <p class="text-gray-600 mb-4 font-bold"> GiftBox Mogul </p>
                  <p class="text-gray-600 mb-8 font-bold">  #Virtual_Birtday_Party </p>
                 
            
            {/* <!-- Buttons --> */}
            <div class="space-y-4">
                      <button
                          className=" download-btn w-full bg-cyan-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
                          onClick={() => downloadCard()}
                         
                      >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Download
                </button>
                
                
            </div>
            
      
        </div>
    </div>
        {/* <button onClick ={()=>navigate('./Thanks')}> Process</button> */}
      <button className="bg-[#27548A]  py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick={() => navigate('../Thanks')}> Proceeds to Checkout </button>

    </div>
  );
}

export default Giftbox;
