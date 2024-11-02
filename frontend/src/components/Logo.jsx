import React from "react";
import { useSelector } from "react-redux";


function Logo({ className, inline = false, mobile = false }) {

  const theme = useSelector((state) => state.theme.theme);
  return (
    <div
      className={`font-bold text-xl font-[montserrat] flex items-center justify-center w-full ${className} ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <img src="/logo.gif" alt="logo" className="w-10 h-10 inline-block mr-2" />

      <div
        className={`flex ${inline ? "flex-row" : " flex-col"} ${
          mobile && "hidden md:block"
        }`}
      >
        <div>WatchWave</div>
        {/* <div>Wave</div> */}
      </div>
    </div>
  );
}

export default Logo;
