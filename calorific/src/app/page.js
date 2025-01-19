"use client";

import Photo from "@/app/photo/page"
import Login from "./login/page";

import {useRouter} from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div> 
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Paytone+One&family=Yeseva+One&display=swap" rel="stylesheet"></link>
      
      {/* Top left on home page */}
      <div className="flex justify-between items-center p-4">
        <div className="text-xl font-bold">calorific</div> {/* change font of this */}
        <div className="text-2xl cursor-pointer">
          <span className="material-icons">menu</span>
        </div>
      </div>

      {/* Centered title section */}
      <div class="text-center mt-10">
        <h1 class="text-4xl font-bold">what are we eating today?</h1>
        <hr class="ml-10 mr-10 my-4 border-t-2 border-gray-300"></hr>
        <p class="text-gray-600">know whats in your food</p>
      </div>
      
      
      <a onClick={() => router.push('/photo')}>Photo</a>
      {/* <Photo>photo</Photo> */}

      <a onClick={() => router.push('/login')}> Login</a>
      {/* <Login>login</Login> */}
    </div>
  );
}
