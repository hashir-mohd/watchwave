import React from "react";

function Logo({ className, inline = false, mobile = false }) {
  return (
    <div
      className={`font-bold text-xl flex items-center justify-center w-full ${className} text-purple-500 italic`}
    >
      <img
        src="/logo.jpg"
        alt="logo"
        className="w-10 h-10 inline-block mr-2"
      />

      <div
        className={`flex ${inline ? "flex-row" : " flex-col"} ${
          mobile && "hidden md:block"
        }`}
      >
        <div>Watch Wave</div>
        {/* <div>Wave</div> */}
      </div>
    </div>
  );
}

export default Logo;
