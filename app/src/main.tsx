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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Signup from "@/pages/SignUp.tsx";
import ProtectedRoute from "@/components/atoms/ProtectedRoute.tsx";
import Login from "@/pages/Login.tsx";
import { AuthProvider } from "@/hooks/useAuth";
import { SubscriptionProvider } from "@/hooks/useSubscription.tsx";

const queryClient = new QueryClient();

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
    element: <ProtectedRoute component={Dashboard} />,
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
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RegisterSpecialistProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <RouterProvider router={router} />
          </SubscriptionProvider>
        </AuthProvider>
        <Toaster />
      </RegisterSpecialistProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
