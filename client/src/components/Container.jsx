/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import useStore from "./Store";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import App from "../App";
import Pricing from "./Pricing";

function Container() {
  const { currentPage, setShowContainer } = useStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  let pageContent;
  switch (currentPage) {
    case "About":
      pageContent = <About />;
      break;
    case "Projects":
      pageContent = <Projects />;
      break;
    case "Contact":
      pageContent = <Contact />;
      break;
    case "Pricing":
      pageContent = <Pricing />;
      break  
    default:
      pageContent = <About />;
      break;
  }

  return (
    <div className="flg:block dark:bg-gray-800 bg-white p-6 shadow-lg  outline outline-black/5 w-full h-screen flex flex-col">
      <Navbar />
      {windowWidth < 1024 && (
        <button
          onClick={() => setShowContainer(false)}
          className="absolute top-12 left-4 text-indigo-600 hover:text-indigo-800 transition-colors duration-200 z-50"
        >
          <i className="fas fa-arrow-left fa-lg"></i>
        </button>
      )}

      <div className=" dark:bg-gray-800 bg-white p-6  w-full h-fit overflow-y-auto ">
        {pageContent}
      </div>
    </div>
  );
}

export default Container;
