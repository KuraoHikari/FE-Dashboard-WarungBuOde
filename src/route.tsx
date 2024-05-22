import { createBrowserRouter } from "react-router-dom";
import { authLoader } from "./loaders/authLoader";

import { DashboardLayout } from "./layout/DashboardLayout";
import AuthLayout from "./layout/AuthLayout";
const router = createBrowserRouter([
 {
  path: "/auth",
  element: <AuthLayout />,
  loader: authLoader,
 },
 {
  path: "/",
  element: <DashboardLayout />,
 },
]);

export default router;
