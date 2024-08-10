import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx';
import "./index.css";


const router = createBrowserRouter([
    {
        path: '/',
        element:( <App />),
        children:[
            {   
                path:"/",
                element: <Home />,
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>

)
