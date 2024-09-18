import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { BsMoonStarsFill } from "react-icons/bs";
import { useState } from "react";
import { IoSunny } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../assets/AuthContext";
import LoginButton from "./LoginButton";

export default function Navbar({ handleDarkMode, Mode }) {
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser } = useAuth();
  return (
    <nav className="flex flex-row items-center justify-between h-[15svh] mb-5 relative">
      <Link to={"/"}>
        <h2 className="font-Mate text-4xl">WATCH MY CSS</h2>
      </Link>
      <div className="w-1/2 flex items-center justify-evenly">
        <ul
          className={`flex flex-col justify-evenly md:h-auto h-[50vh] items-center z-10 md:flex-row md:items-center md:justify-evenly md:grow md:static absolute top-[15vh] ${
            showMenu ? `translate-x-0` : `-translate-x-[100vw] `
          } md:translate-x-0 left-0 transition-transform rounded-xl border-2 md:drop-shadow-none drop-shadow-xl dark:border-light border-dark md:border-none duration-300 w-full dark:bg-dark bg-light`}
        >
          <li className="hover:border-b-dark dark:hover:border-b-light hover:border-b-2 cursor-pointer border-spacing-2">
            Loaders
          </li>
          <li className="hover:border-b-dark dark:hover:border-b-light hover:border-b-2 cursor-pointer border-spacing-2">
            Cards
          </li>
          <li className="hover:border-b-dark dark:hover:border-b-light hover:border-b-2 cursor-pointer border-spacing-2">
            CheckBox
          </li>
          <li className=" cursor-pointer border-spacing-2">
            <LoginButton currentUser={currentUser} />
          </li>
        </ul>
        <div className="md:hidden ">
          <button onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <IoMdClose size={32} /> : <IoMdMenu size={32} />}
          </button>
        </div>
        <button
          onClick={handleDarkMode}
          className="md:grow-0 p-3 rounded-full border-2"
        >
          {Mode ? <BsMoonStarsFill /> : <IoSunny />}
        </button>
      </div>
    </nav>
  );
}
