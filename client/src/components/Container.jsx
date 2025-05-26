/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./Navbar";
import useStore from "./Store";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import App from "../App";
import Pricing from "./Pricing";

function Container() {
  const { currentPage } = useStore();

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
      <div className=" dark:bg-gray-800 bg-white p-6  w-full h-fit overflow-y-auto ">
        {pageContent}
      </div>
    </div>
  );
}

export default Container;
