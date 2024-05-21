import { createBrowserRouter } from "react-router-dom";
import { authLoader } from "./loaders/authLoader";

import { DashboardLayout } from "./layout/DashboardLayout";
const router = createBrowserRouter([
 {
  path: "/auth",
  element: <div>Auth</div>,
  loader: authLoader,
 },
 {
  path: "/",
  element: <DashboardLayout />,
 },
]);

export default router;
