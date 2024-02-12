import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Availability from "./pages/Availability.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { RegisterSpecialistProvider } from "@/hooks/useRegisterSpecialist";

const router = createBrowserRouter([
  {
    path: "/setup/url",
    element: <App />,
  },
  {
    path: "/setup/availability",
    element: <Availability />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RegisterSpecialistProvider>
      <RouterProvider router={router} />
    </RegisterSpecialistProvider>
  </React.StrictMode>
);
