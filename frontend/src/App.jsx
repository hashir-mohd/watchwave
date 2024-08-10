import { useState } from "react";
import { Outlet } from "react-router-dom";


function App() {
  const [showSidebar, setShowSidebar] = useState(true); 
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;