"use client";

import Photo from "@/app/photo/page"
import Login from "./login/page";

import {useRouter} from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div> 
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Paytone+One&family=Yeseva+One&display=swap" rel="stylesheet"></link>
      
      <div className="bg-cream-white">
        {/* Top left on home page */}
        <div className="flex justify-between items-center p-4">
          <div className="text-xl font-bold text-black">calorific</div> {/* change font of this */}
          <div className="text-2xl cursor-pointer text-black">
            <span className="material-icons">menu</span>
          </div>
        </div>

        {/* Centered title section */}
        <div className="text-center mt-10 text-black">
          <h1 className="text-4xl font-bold">what are we <br></br> eating today?</h1>
          <hr className="ml-10 mr-10 my-4 border-t-1 border-gray-500"></hr>
          <p className="text-gray-600">know whats in your food</p>
          <img src="/included_images/ramen_svg.svg" className="mx-auto -mt-10" alt="food plate" width="460" height="345"/>
        </div>

        {/* Buttons for logging in and quick scan */}
        <div className="flex flex-col items-center -mt-10 space-y-4">
          <button onClick={() => router.push('/login')} className="px-6 py-2 bg-theme-orange text-white rounded hover:bg-blue-600">Log In</button>
          <button onClick={() => router.push('/photo')} className="px-6 py-2 bg-light-orange text-white rounded hover:bg-green-600">Quick Scan</button>
          <hr className="ml-10 mr-10 my-4 border-t-1 border-gray-500"></hr>
          <h1 class="text-4xl font-bold mb-6">How it works</h1>
        </div>

        

        {/* <a onClick={() => router.push('/login')}>Log in or Sign up</a> */}
        {/* <Login>login</Login> */}

        {/* <a onClick={() => router.push('/photo')}>Quick Scan</a> */}
        {/* <Photo>photo</Photo> */}

      </div>

    </div>
  );
}
