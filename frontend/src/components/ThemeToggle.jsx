// ThemeToggle.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import Button from "./Button";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className={`border-[#121212] rounded-full flex items-center justify-center space-x-2 p-2 ${
        theme === "dark"
          ? "bg-gray-500 hover:bg-slate-400 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-black"
      }`}
    >
      {theme === "light" ? <FaMoon size={25} /> : <FaSun size={25} />}
      
    </button>
  );
};

export default ThemeToggle;
