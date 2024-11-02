import React from "react";
import { FiX } from "react-icons/fi";
import { LoginForm, Logo } from "./index.js";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { setUser } from "../features/authSlice.js";

const LoginPopup = ({ onClose, loginTo }) => {
  const dispatch = useDispatch();
  const onLogin = (session) => {
    dispatch(setUser(session));
  };

  // Get the theme from the Redux store
  const theme = useSelector((state) => state.theme.theme);

  // Determine classes based on the theme
  const themeClasses =
    theme === "dark" ? "bg-[#121212] text-gray-200" : "bg-white text-gray-600";

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div
        className={`border-collapse  rounded-lg p-8 w-full max-w-md relative ${themeClasses}`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-3 bg-gray-800 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col gap-4 items-center mb-6">
          <Logo className="text-3xl font-bold text-[#00bcd4]" />
          <h2 className="text-xl font-semibold">
            Login to {loginTo || "Continue"}
          </h2>
        </div>

        <LoginForm onLogin={onLogin} />

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#00bcd4] hover:text-[#00bcd4]">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
