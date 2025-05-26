/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import useStore from "./Store";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const { currentPage, setCurrentPage } = useStore();
  const { showContainer, setShowContainer } = useStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Portfolio
        </h1>

        <div className="hidden lg:flex gap-10">
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setCurrentPage("About")}
          >
            About
          </button>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setCurrentPage("Projects")}
          >
            Projects
          </button>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setCurrentPage("Pricing")}
          >
            Pricing
          </button>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setCurrentPage("Contact")}
          >
            Contact
          </button>
        </div>
        {/* small and medium screen */}
        <div
          className="lg:hidden"
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            onClick={toggleDropdown}
            className="text-gray-600 hover:text-gray-800 p-2 rounded-md "
          >
            <i className="fa-solid fa-bars fa-lg text-black dark:text-white "></i>
          </button>

          {/* Dropdown <i className="fa-solid fa-bars"></i> */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-screen flex justify-center items-center bg-white shadow-lg rounded-md dark:bg-gray-800">
              <div
                className="w-full max-w-xs"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className="block px-4 py-2 text-gray-600 hover:text-gray-800 w-full text-center dark:text-white"
                  onClick={() => setCurrentPage("About")}
                >
                  About
                </button>
                <button
                  className="block px-4 py-2 text-gray-600 hover:text-gray-800 w-full text-center dark:text-white"
                  onClick={() => setCurrentPage("Projects")}
                >
                  Projects
                </button>
                <button
                  className="block px-4 py-2 text-gray-600 hover:text-gray-800 w-full text-center dark:text-white"
                  onClick={() => setCurrentPage("Contact")}
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
