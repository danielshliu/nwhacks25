// import { useState } from 'react'
// import React from "react";
// import './App.css'

import { NavLink } from "react-router";


export default function App() {
  return (
    <div class="bg-placeholder-color-2 py-24 sm:py-32">
        <div class="absolute h-full w-full">
          <NavLink to="/photo" end>
            Photo
          </NavLink>
        </div>
    </div>
  );
}

