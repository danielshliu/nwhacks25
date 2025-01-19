"use client";

// import Photo from "@/app/photo/page"
// import Login from "./login/page";

import {useRouter} from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div className="overscroll-x-none overscroll-y-none"> 
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Paytone+One&family=Yeseva+One&display=swap" rel="stylesheet"></link>
      
      <div className="bg-cream-white min-h-fit">
        {/* Top left on home page */}
        <div className="flex justify-between items-center p-4">
          <div className="text-xl font-bold text-black">calorific</div> {/* change font of this */}
          <div className="text-2xl cursor-pointer text-black">
            <span className="material-icons">
              <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line y1="2" x2="23.8924" y2="2" stroke="#878787" strokeWidth="4"/>
                <line x1="0.107635" y1="20" x2="24" y2="20" stroke="#878787" strokeWidth="4"/>
                <line x1="0.107635" y1="11" x2="24" y2="11" stroke="#878787" strokeWidth="4"/>
              </svg>
            </span>
          </div>
        </div>

        {/* Centered title section */}
        <div className="text-center mt-10 text-black">
          <h1 className="text-4xl font-bold">what are we <br></br> eating today?</h1>
          <hr className="ml-10 mr-10 my-4 border-t-1 border-gray-500"></hr>
          <p className="text-gray-600">know what's in your food.</p>
          <img src="/included_images/ramen_svg.svg" className="mx-auto -mt-10" alt="food plate" width="460" height="345"/>
        </div>

        {/* Buttons for logging in and quick scan */}
        <div className="flex flex-col items-center -mt-10 space-y-4">
          <button onClick={() => router.push('/login')} className="px-6 py-2 bg-login-button-color text-black rounded hover:bg-blue-600">Log In</button>
          <button onClick={() => router.push('/photo')} className="px-6 py-2 bg-quick-scan-button-color text-black rounded hover:bg-green-600">Quick Scan</button>
        </div>

        {/* How it works and more details !!!!! need to add padding to the bottom */}
        <div className="grid text-center mt-18 py-16">
          <hr className="ml-10 mr-10 my-4 border-t-1 border-black"></hr>
          <div className="grid justify-center"> 

            <h1 className="text-xl font-bold mb-6 text-black">How it Works:</h1>

            <ol className="space-y-6 text-left mx-auto max-w-xl ml-10 mr-10">
              <li className="flex items-start text-black">
                <span className="font-bold text-lg text-black mr-4">1.</span>
                <p>Snap a photo of your meal or upload an existing picture.</p>
              </li>
              <li className="flex items-start text-black">
                <span className="font-bold text-lg text-black mr-4">2.</span>
                <p>Our algorithm will analyze your image’s contents to give you an estimate of calorie count and nutritional value.</p>
              </li>
              <li className="flex items-start text-black">
                <span className="font-bold text-lg text-black mr-4">3.</span>
                <p>Create a free account or login to save and track your meals!</p>
              </li>
            </ol>
          </div>
        </div>

        

        {/* <a onClick={() => router.push('/login')}>Log in or Sign up</a> */}
        {/* <Login>login</Login> */}

        {/* <a onClick={() => router.push('/photo')}>Quick Scan</a> */}
        {/* <Photo>photo</Photo> */}

      </div>

    </div>
  );
}
