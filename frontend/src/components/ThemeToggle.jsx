// ThemeToggle.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice"; 

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className={` ${
        theme === "dark"
          ? "bg-[#000000] text-white border-[#121212]"
          : "bg-white text-black border-gray-200"
      }`}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default ThemeToggle;
