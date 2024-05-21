import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query-clinet.ts";
import { TooltipProvider } from "./components/ui/tooltip.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
 <React.StrictMode>
  <QueryClientProvider client={queryClient}>
   <TooltipProvider>
    <App />
   </TooltipProvider>
  </QueryClientProvider>
 </React.StrictMode>
);
