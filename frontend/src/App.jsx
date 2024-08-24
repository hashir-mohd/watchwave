import { useState } from "react";
import { Outlet } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  const [showSidebar, setShowSidebar] = useState(true); 
  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Outlet />
    </div>
    </QueryClientProvider>
  );
}

export default App;