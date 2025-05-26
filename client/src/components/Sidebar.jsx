
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "./Store";
import Navbar from "./Navbar";
function Sidebar() {
  const { showContainer, setShowContainer } = useStore();
  const {setCurrentPage} = useStore()
  const navigate=useNavigate()

  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 w-full h-screen">
      <div
        id="image-container"
        className="w-60 h-60 rounded-full overflow-hidden"
      >
        <img
          className="w-full h-full object-cover"
          src="assets/WhatsApp Image 2025-03-25 at 18.45.03.jpeg"
          alt="Profile"
        />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-400">
          Samuel Gitau
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 cursor-pointer hover:scale-105">
          Software Engineer <span className="mx-1">||</span>Full Stack Web Developer
        </p>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <button
          className="block lg:hidden bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95"
          onClick={() => setCurrentPage("About")}
        >
          About Me
        </button>
        <button
          className="block lg:hidden bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95"
          onClick={() => setCurrentPage("Projects")}
        >
          Projects
        </button>
        <button
          className="block lg:hidden bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95"
          onClick={() => setCurrentPage("Contact")}
        >
          Contact Me
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
