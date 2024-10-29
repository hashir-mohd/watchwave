// ThemeToggle.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice"; 
import Button from "./Button";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button
      onClick={handleToggle}
      className={`border-[#121212] rounded-xl flex items-center justify-center ${
        theme === "dark"
          ? "bg-gray-500 hover:bg-slate-400 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-black"
      }`}
    >
      <span>{theme === "light" ? "Dark" : "Light"}</span> <span> Mode</span>
    </Button>
  );
};

export default ThemeToggle;
