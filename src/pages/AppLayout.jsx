import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";
import AuthContextProvider from "../assets/AuthContext";

export default function AppLayout() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <AuthContextProvider>
      <div
        className={`bg-light text-dark dark:bg-dark dark:text-light ${
          darkMode ? "dark" : ""
        } h-auto w-auto`}
      >
        <div className="container font-Mod">
          <Navbar handleDarkMode={toggleDarkMode} Mode={darkMode} />
          <Outlet />
        </div>
      </div>
    </AuthContextProvider>
  );
}
