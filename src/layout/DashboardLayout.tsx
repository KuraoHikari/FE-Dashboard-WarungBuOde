import {
 DashboardSidebar,
 MobileDashboardSidebar,
} from "@/components/ui/sidebar";

import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbLink,
 BreadcrumbList,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Outlet, useLocation } from "react-router-dom";

export function DashboardLayout() {
 const location = useLocation();

 return (
  <div className="flex min-h-screen w-full flex-col bg-muted/40">
   <DashboardSidebar />
   <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
     <MobileDashboardSidebar />
     <Breadcrumb className="hidden sm:flex">
      <BreadcrumbList>
       <BreadcrumbItem>
        <BreadcrumbLink asChild>
         <div>Dashboard</div>
        </BreadcrumbLink>
       </BreadcrumbItem>
       <BreadcrumbSeparator />

       <BreadcrumbItem>
        <BreadcrumbPage>{location.pathname.substring(1)}</BreadcrumbPage>
       </BreadcrumbItem>
      </BreadcrumbList>
     </Breadcrumb>
     {/* <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
       type="search"
       placeholder="Search..."
       className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
     </div> */}
     {/* <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Button
        variant="outline"
        size="icon"
        className="overflow-hidden rounded-full"
       >
        <img
         src="/placeholder-user.jpg"
         width={36}
         height={36}
         alt="Avatar"
         className="overflow-hidden rounded-full"
        />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
       <DropdownMenuLabel>My Account</DropdownMenuLabel>
       <DropdownMenuSeparator />
       <DropdownMenuItem>Settings</DropdownMenuItem>
       <DropdownMenuItem>Support</DropdownMenuItem>
       <DropdownMenuSeparator />
       <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
     </DropdownMenu> */}
    </header>
    <Outlet />
   </div>
  </div>
 );
}
