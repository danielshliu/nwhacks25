import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Photo from './Photo.jsx'
import App from './App.jsx'

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<App />} />
      <Route path="photo" element={<Photo />} />
    </Routes>
  </BrowserRouter>
);
