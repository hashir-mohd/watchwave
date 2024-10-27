import React from "react";

function Button({ className, children, type = "Button", ...props }) {
  return (
    <button
      className={`w-full px-3 py-2 sm:w-auto border-[#121212] rounded-xl font-bold ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
