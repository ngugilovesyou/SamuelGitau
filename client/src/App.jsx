/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Container from "./components/Container";
import useStore from "./components/Store";

function App() {
  const { showContainer } = useStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-screen dark:bg-gray-800 w-screen overflow-x-hidden
        grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[35vw_65vw]
      `}
    >
      {/* Show Sidebar on large screens, or conditionally on small */}
      {(!showContainer || windowWidth >= 1024) && <Sidebar />}

      {/* Show Container on large screens, or if showContainer is true */}
      {(showContainer || windowWidth >= 1024) && <Container />}
    </div>
  );
}

export default App;
