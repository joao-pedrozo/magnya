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
import Schedule from "@/pages/Schedule.tsx";
import Page404 from "@/pages/404.tsx";

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
  {
    path: "/:username",
    element: <Schedule />,
  },
  {
    path: "/404",
    element: <Page404 />,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RegisterSpecialistProvider>
      <RouterProvider router={router} />
    </RegisterSpecialistProvider>
  </React.StrictMode>
);
