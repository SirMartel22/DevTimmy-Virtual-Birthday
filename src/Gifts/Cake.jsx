import React from 'react';
import {useNavigate} from "react-router-dom"

const Cake = () => {

  const navigate = useNavigate()
  return (
    <div>

    {/* <!-- Content area --> */}
    <div class="relative z-10 min-h-screen flex items-center justify-center p-8 items-center">
        
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full text-center shadow-xl">
            {/* <!-- Candle icon --> */}
            <div class="mb-6">
                      
                
            <div class="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                    {/* <!-- Background container --> */}
                <div class="fixed inset-0 -z-10 overflow-hidden">
                    {/* <!-- Large blob top-left --> */}
                    <div class="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/60 rounded-full blob-1">
                    </div>
                    
                    {/* <!-- Medium blob top-center --> */}
                    <div class="absolute -top-16 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-emerald-100/80 rounded-full blob-2"></div>
                    
                    {/* <!-- Small blob bottom-right --> */}
                    <div class="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-200/50 rounded-full blob-3"></div>
                    
                    {/* <!-- Additional subtle blob --> */}
                    <div class="absolute top-1/3 -left-20 w-48 h-48 bg-emerald-100/40 rounded-full blob-4"></div>
                    
                    {/* <!-- Extra decorative elements --> */}
                    <div class="absolute top-2/3 right-1/4 w-32 h-32 bg-emerald-50/60 rounded-full"></div>
                    <div 
                    class="absolute bottom-1/4 left-1/3 w-24 h-24 bg-emerald-100/30 rounded-full"></div>
                </div>
                        <svg class="w-8 h-8 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2c0 1.5-1 3-1 4.5 0 1.5 1 2.5 1 2.5s1-1 1-2.5c0-1.5-1-3-1-4.5z"/>
                        <rect x="11" y="8" width="2" height="12" rx="1"/>
                        <ellipse cx="12" cy="21" rx="3" ry="1"/>
                    </svg>
                </div>
            </div>
            
            <h1 class="text-3xl font-bold text-emerald-600 mb-6">Virtual Candle</h1>
            
            <p class="text-gray-700 text-lg mb-8">You won a birthday candle to light for DevTimmy!</p>
            
            {/* <!-- Candle icon in content --> */}
            <div class="mb-8">
                <svg class="w-12 h-12 mx-auto text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c0 1.5-1 3-1 4.5 0 1.5 1 2.5 1 2.5s1-1 1-2.5c0-1.5-1-3-1-4.5z"/>
                    <rect x="11" y="8" width="2" height="12" rx="1" fill="#8B4513"/>
                    <ellipse cx="12" cy="21" rx="3" ry="1" fill="#8B4513"/>
                </svg>
            </div>
            
            <p class="text-gray-600 mb-8">I lit a candle for DevTimmy's big day! 🎂 #BdaySpin</p>
            
            {/* <!-- Buttons --> */}
            <div class="space-y-4">
                <button class="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Download
                </button>
                
                <button class="w-full bg-white hover:bg-gray-50 text-emerald-600 font-semibold py-3 px-6 rounded-xl border-2 border-emerald-200 transition-colors flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                    </svg>
                    Share
                </button>
            </div>
            
            <button class="mt-6 text-gray-500 hover:text-gray-700 font-medium transition-colors">
                Try Again
            </button>
        </div>
    </div>
        {/* <button onClick ={()=>navigate('./Thanks')}> Process</button> */}
      <button className="bg-[#94B4C1] py-4 px-8 rounded-md shadow-div-shadow transform hover:scale-105 hover:bg-[#332D56] transition duration-300" onClick={() => navigate('../Thanks')}> Proceeds to Checkout </button>

    </div>
  );
}

export default Cake;
