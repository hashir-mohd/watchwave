import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/index.js";
import { LoginForm } from "../components/index.js";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { setUser } from "../features/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (session) => {
    dispatch(setUser(session));
    navigate("/");
  };

  // Get the theme from the Redux store
  const theme = useSelector((state) => state.theme.theme);

  // Define background and text color based on the theme
  const themeClasses =
    theme === "dark"
      ? "bg-[#121212] text-gray-200" // Dark mode colors
      : "bg-white text-gray-800"; // Light mode colors

  return (
    <div
      className={`h-screen overflow-y-auto ${themeClasses} flex justify-center items-center`}
    >
      <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
        <div className="w-full flex justify-center items-center">
          <Logo
            className={"w-full text-center text-2xl font-semibold uppercase"}
            inline={true}
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center mb-6">
          <h1 className="text-2xl">Login</h1>
          <span>
            Don't have an account?
            <Link to="/signup" className="text-blue-500 inline">
              Signup
            </Link>
          </span>
        </div>
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
}

export default Login;
