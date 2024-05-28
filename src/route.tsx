import { createBrowserRouter } from "react-router-dom";
import { authLoader } from "./loaders/authLoader";

import { DashboardLayout } from "./layout/DashboardLayout";
import AuthLayout from "./layout/AuthLayout";
import { Pizza, ReceiptText, Store } from "lucide-react";

export const menuRoute = [
 {
  name: "Warung",
  path: "/warung",
  element: <DashboardLayout />,
  icon: <Store className="h-5 w-5" />,
 },
 {
  name: "Menu",
  path: "/menu",
  element: <DashboardLayout />,
  icon: <Pizza className="h-5 w-5" />,
 },
 {
  name: "Bill",
  path: "/bill",
  element: <DashboardLayout />,
  icon: <ReceiptText className="h-5 w-5" />,
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
  path: "/",
  element: <DashboardLayout />,
 },
]);

export default router;
