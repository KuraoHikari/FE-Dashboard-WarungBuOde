import { createBrowserRouter } from "react-router-dom";
import { authLoader } from "./loaders/authLoader";

import { DashboardLayout } from "./layout/DashboardLayout";
import AuthLayout from "./layout/AuthLayout";
import { Pizza, ReceiptText, Store } from "lucide-react";
import { dashboardLoader } from "./loaders/dashboardLoader";
import NotFoundPage from "./pages/NotFoundPage";

export const menuRoute = [
 {
  name: "Warung",
  path: "/warung",
  element: <DashboardLayout />,
  icon: <Store className="h-5 w-5" />,
  loader: dashboardLoader,
  index: true,
 },
 {
  name: "Menu",
  path: "/menu",
  element: <DashboardLayout />,
  icon: <Pizza className="h-5 w-5" />,
  loader: dashboardLoader,
 },
 {
  name: "Bill",
  path: "/bill",
  element: <DashboardLayout />,
  icon: <ReceiptText className="h-5 w-5" />,
  loader: dashboardLoader,
 },
];
const router = createBrowserRouter([
 ...menuRoute,
 {
  path: "/auth",
  element: <AuthLayout />,
  loader: authLoader,
 },
 {
  path: "*",
  element: <NotFoundPage />,
 },
]);

export default router;
