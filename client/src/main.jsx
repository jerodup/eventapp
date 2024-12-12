import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import NavBar from "./components/navBar.jsx"; // Asegúrate de usar PascalCase
import Home from "./routes/Home.jsx";
import Register from "./routes/Register.jsx";
import Login from "./routes/Login.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Auth from "./components/auth.jsx";
import EventDetail from "./routes/EventDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/events/:id",
    element: <EventDetail />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <Auth>
        <Dashboard />
      </Auth>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </StrictMode>
);
