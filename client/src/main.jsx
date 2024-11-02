import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import{createBrowserRouter, RouterProvider} from "react-router-dom"

import Home from './routes/Home.jsx'
import Register from './routes/Register.jsx'
import Login from './routes/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
