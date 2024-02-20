import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./globals.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Availability from "./pages/Availability.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { RegisterSpecialistProvider } from "@/hooks/useRegisterSpecialist";
import Welcome from "@/pages/Welcome.tsx";

const router = createBrowserRouter([
  {
    path: "/setup/url",
    element: <Welcome />,
  },
  {
    path: "/setup/availability",
    element: <Availability />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RegisterSpecialistProvider>
      <RouterProvider router={router} />
    </RegisterSpecialistProvider>
  </React.StrictMode>
);
