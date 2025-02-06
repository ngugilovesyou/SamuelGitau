/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Container from "./components/Container";
import useStore from "./components/Store";
function App() {
  const { showContainer } = useStore();
  
  return (
    <div
      className={`h-screen dark:bg-gray-800 w-screen overflow-x-hidden
        grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[35vw_65vw] 
      `}
    >

      {!showContainer || window.innerWidth >= 1024 ? <Sidebar /> : null}

      {/* Always show Container on large screens, but conditionally on small screens */}
      {showContainer || window.innerWidth >= 1024 ? <Container /> : null}
    </div>
  );
}

export default App;
