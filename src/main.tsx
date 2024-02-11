import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Availability from "./pages/Availability.tsx";

const router = createBrowserRouter([
  {
    path: "/setup/url",
    element: <App />,
  },
  {
    path: "/setup/availability",
    element: <Availability />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
