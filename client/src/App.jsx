import { RouterProvider, createBrowserRouter } from "react-router-dom";


import Navbar from "./components/Navbar.jsx"; 

import Home from "./routes/Home.jsx";
import Register from "./routes/Register.jsx";
import Login from "./routes/Login.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Auth from "./components/auth.jsx";
import EventDetail from "./routes/EventDetail.jsx";


const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/events/:id",
      element: (
        <>
          <Navbar />
          <EventDetail />
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Navbar />
          <Register />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Auth>
          <Navbar />
          <Dashboard />
        </Auth>
      ),
    },
  ]);
export default function App() {
  return (
    <div className="min-h-screen  bg-gray-100">
    <RouterProvider router={router} />
    </ div>
  )
}