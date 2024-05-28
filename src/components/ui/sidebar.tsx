import { Home, LineChart, LogOut, Package, Package2, PanelLeft, Settings, ShoppingCart, Users2 } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ModeToggle } from "../mode-toggle";
import { Button } from "./button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";

export const DashboardSidebar = () => {
 const navigate = useNavigate();
 const toggleLogout = useCallback(() => {
  localStorage.removeItem("token");
  navigate("/auth");
 }, [navigate]);
 return (
  <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
   <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
    <div className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
     <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
     <span className="sr-only">Acme Inc</span>
    </div>
    <Tooltip>
     <TooltipTrigger asChild>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
       <Home className="h-5 w-5" />
       <span className="sr-only">Dashboard</span>
      </div>
     </TooltipTrigger>
     <TooltipContent side="right">Dashboard</TooltipContent>
    </Tooltip>
    <Tooltip>
     <TooltipTrigger asChild>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
       <ShoppingCart className="h-5 w-5" />
       <span className="sr-only">Orders</span>
      </div>
     </TooltipTrigger>
     <TooltipContent side="right">Orders</TooltipContent>
    </Tooltip>
    <Tooltip>
     <TooltipTrigger asChild>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
       <Package className="h-5 w-5" />
       <span className="sr-only">Products</span>
      </div>
     </TooltipTrigger>
     <TooltipContent side="right">Products</TooltipContent>
    </Tooltip>
    <Tooltip>
     <TooltipTrigger asChild>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
       <Users2 className="h-5 w-5" />
       <span className="sr-only">Customers</span>
      </div>
     </TooltipTrigger>
     <TooltipContent side="right">Customers</TooltipContent>
    </Tooltip>
    <Tooltip>
     <TooltipTrigger asChild>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
       <LineChart className="h-5 w-5" />
       <span className="sr-only">Analytics</span>
      </div>
     </TooltipTrigger>
     <TooltipContent side="right">Analytics</TooltipContent>
    </Tooltip>
   </nav>
   <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
    <Popover>
     <Tooltip>
      <TooltipTrigger asChild>
       <PopoverTrigger asChild>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
         <Settings className="h-5 w-5" />
         <span className="sr-only">Settings</span>
        </div>
       </PopoverTrigger>
      </TooltipTrigger>

      <PopoverContent className="ms-5 w-24">
       <div className="grid gap-4">
        <div className="space-y-2">
         <h4 className="font-medium leading-none">Settings</h4>
        </div>
        <div className="grid gap-2 justify-center">
         <ModeToggle />

         <Button variant="outline" size="icon" onClick={toggleLogout}>
          <LogOut className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />

          <span className="sr-only">Log Out</span>
         </Button>
        </div>
       </div>
      </PopoverContent>
      <TooltipContent side="right">Settings</TooltipContent>
     </Tooltip>
    </Popover>
   </nav>
  </aside>
 );
};

export const MobileDashboardSidebar = () => {
 const navigate = useNavigate();
 const toggleLogout = useCallback(() => {
  localStorage.removeItem("token");
  navigate("/auth");
 }, [navigate]);
 return (
  <Sheet>
   <SheetTrigger asChild>
    <Button size="icon" variant="outline" className="sm:hidden">
     <PanelLeft className="h-5 w-5" />
     <span className="sr-only">Toggle Menu</span>
    </Button>
   </SheetTrigger>
   <div className="sm:hidden">
    <ModeToggle />
   </div>

   <SheetContent side="left" className="sm:max-w-xs">
    <nav className="grid gap-6 text-lg font-medium">
     <div className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
      <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
      <span className="sr-only">Acme Inc</span>
     </div>
     <div className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
      <Home className="h-5 w-5" />
      Dashboard
     </div>
     <div className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
      <ShoppingCart className="h-5 w-5" />
      Orders
     </div>
     <div className="flex items-center gap-4 px-2.5 text-foreground">
      <Package className="h-5 w-5" />
      Products
     </div>
     <div className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
      <Users2 className="h-5 w-5" />
      Customers
     </div>

     <div
      onClick={toggleLogout}
      className=" flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
     >
      <LogOut className="h-5 w-5" />
      LogOut
     </div>
    </nav>
   </SheetContent>
  </Sheet>
 );
};
