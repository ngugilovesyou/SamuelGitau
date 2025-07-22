
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import useStore from "./Store";
import Navbar from "./Navbar";
function Sidebar() {
  const { setCurrentPage, setShowContainer } = useStore();
  const navigate=useNavigate()

  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 w-full h-screen">
      <div
        id="image-container"
        className="w-60 h-60 rounded-full overflow-hidden"
      >
        <img
          className="w-full h-full object-cover"
          src="assets/arnold-francisca-f77Bh3inUpE-unsplash.jpg"
          alt="Profile"
        />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-400">
          Samuel Gitau
        </h1>
        <p className="relative text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer font-semibold tracking-wide group">
          <span className="animate-pulse">Software Engineer</span>
          <span className="mx-2 text-gray-400 dark:text-gray-500 group-hover:text-blue-400">
            ||
          </span>
          <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-text-slide">
            Web Developer
          </span>
        </p>
      </div>
      <div className="flex flex-row gap-4 mt-4">
        <button
          className="block lg:hidden bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95"
          onClick={() => {
            setCurrentPage("About");
            setShowContainer(true);
          }}
        >
          About Me
        </button>
        <button
          className="block lg:hidden bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95"
          onClick={() => {
            setCurrentPage("Projects");
            setShowContainer(true);
          }}
        >
          Projects
        </button>
        <button
          className="block lg:hidden bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95"
          onClick={() => {
            setCurrentPage("Contact");
            setShowContainer(true);
          }}
        >
          Contact Me
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
