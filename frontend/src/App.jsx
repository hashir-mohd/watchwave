import { useState } from "react";
import Header from "./components/Header/Header.jsx";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  
  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <Header />
      <main className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
}

export default App;