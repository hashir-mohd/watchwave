import React, { useEffect, useState } from "react";
import { Header, LoadingSpinner } from "./components/index.js";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { useCurrentUser } from "./hooks/auth.hook.js";
import { setUser } from "./features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ThemeToggle from "./components/ThemeToggle.jsx";
import "./theme.css";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { data: userData, isFetching, error } = useCurrentUser();
  const user = useSelector((state) => state.auth.userData);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    // Set isLoading to false after 10 seconds to match the spinner's animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 10,000 milliseconds = 10 seconds

    if (userData && !user) {
      dispatch(setUser(userData));
    }

    // Clear the timer if the component unmounts before timeout
    return () => clearTimeout(timer);
  }, [userData, dispatch, user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    // Handle error state
    console.error("Error fetching user data:", error);
    // Optionally render an error component here
  }

  return (
    <div
      className={`h-screen overflow-y-auto bg-${
        theme === "dark" ? "[#121212]" : "[white]"
      } text-${theme === "dark" ? "white" : "black"}`}
    >
      <Header />
      {/* <ThemeToggle /> Place the ThemeToggle component here */}
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
