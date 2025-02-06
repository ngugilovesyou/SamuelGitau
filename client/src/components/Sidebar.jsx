
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "./Store";
import Navbar from "./Navbar";
function Sidebar() {
  const { showContainer, setShowContainer } = useStore();
  const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 w-full h-screen">
      <div
        id="image-container"
        className="w-60 h-60 rounded-full overflow-hidden"
      >
        <img
          className="w-full h-full object-cover"
          src="/assets/WhatsApp Image 2024-12-26 at 23.17.38.jpeg"
          alt="Profile"
        />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-400">
          Samuel Gitau
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Software Engineer
        </p>
      </div>
      <button
        className="block lg:hidden bg-blue-300 text-white p-3.5 rounded-2xl font-bold mt-4"
        onClick={()=>navigate('/portfolio')}
      >
        Learn More
      </button>
    </div>
  );
}

export default Sidebar;
