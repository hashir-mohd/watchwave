import React from "react";

function SpButton({ type = "button", className = "", children, ...props }) {
  return (
    <button
      type={type}
      className={`mr-1  bg-[#00bcd4] px-1 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto rounded-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default SpButton;
