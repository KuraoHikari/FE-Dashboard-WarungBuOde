# Warung Bu Ode Management Food
This project is a Progressive Web App (PWA) designed to help manage small stores efficiently. It's built using Node.js, React, and various modern libraries and frameworks to deliver a robust and user-friendly experience.

## Table of Contents

- [Figma Design](#figma-design)
- [Componen](#hooks-and-components-documentation)
  - [Hooks](#hooks)
    - [useGetAllBillsByWarungId](#usegetallbillsbywarungid)
    - [useGetAllUserMenu](#usegetallusermenu)
    - [useGetAllUserWarung](#usegetalluserwarung)
  - [Layout Components](#layout-components)
    - [AuthLayout](#authlayout)
    - [DashboardLayout](#dashboardlayout)
  - [Loaders Documentation](#loaders-documentation)
    - [authLoader](#authloader)
    - [dashboardLoader](#dashboardloader)
- [Installation Instructions](#Installation)

## Figma Design

Include screenshots of your application's design from Figma here.
Mobile 
![Screenshot 2024-06-25 123526](https://github.com/KuraoHikari/FE-Dashboard-WarungBuOde/assets/97963813/ac04d54c-7ea2-4310-beb6-d2b2535054df)
Desktop
![Screenshot 2024-06-25 123547](https://github.com/KuraoHikari/FE-Dashboard-WarungBuOde/assets/97963813/27d4313b-ea18-46e1-a5b4-10f13f4ca689)


## Hooks and Components Documentation

### Hooks

#### useGetAllBillsByWarungId

The `useGetAllBillsByWarungId` hook fetches all bills associated with a specific warung ID using `@tanstack/react-query`.

```javascript
// Example code snippet provided earlier
```

#### useGetAllUserMenu

The `useGetAllUserMenu` hook retrieves all menu items based on specified parameters using `@tanstack/react-query`.

```javascript
// Example code snippet provided earlier
```

#### useGetAllUserWarung

The `useGetAllUserWarung` hook fetches all warungs for the current user using `@tanstack/react-query`.

```javascript
// Example code snippet provided earlier
```

### Layout Components

#### AuthLayout

The `AuthLayout` component manages user authentication UI elements.

```javascript
// Example code snippet provided earlier
```

#### DashboardLayout

The `DashboardLayout` component organizes the dashboard interface with navigation and breadcrumbs.

```javascript
// Example code snippet provided earlier
```

### Loaders Documentation

#### authLoader

The `authLoader` function checks for authentication token existence.

```javascript
// Example code snippet provided earlier
```

#### dashboardLoader

The `dashboardLoader` function ensures user authentication for dashboard access.

```javascript
// Example code snippet provided earlier
```

## Installation Instructions

Follow these steps to install and run the project locally:

1. Clone the repository from GitHub.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm start`.

---

This README provides an overview of hooks, components, and installation instructions necessary for setting up and understanding your "Warung Management by Bu Ode" application. Adjust paths and details as per your project's structure and requirements.

# Hooks

This is hooks of `useGetAllBillsByWarungId`, `useGetAllUserMenu`, `useGetAllUserWarung`

## useGetAllBillsByWarungId

The `useGetAllBillsByWarungId` hook is used to fetch all user bills based on the warung ID. This hook utilizes `useQuery` from `@tanstack/react-query` to fetch data asynchronously from the bill service.

```javascript
import { useQuery } from "@tanstack/react-query";
import { getAllUserBill } from "@/services/billServices";
import { FetchBillsParams } from "@/schemas/billSchema";

export const useGetAllBillsByWarungId = ({
 page,
 limit,
 search,
 status,
 approved,
}: FetchBillsParams) => {
 return useQuery({
  queryKey: ["user-bills", { page, limit, search, status, approved }],
  queryFn: getAllUserBill,
 });
};
```

## useGetAllUserMenu

```javascript
import { FetchMenusParams } from "@/schemas/menuSchema";
import { getAllMenu } from "@/services/menuServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUserMenu = ({
  page,
  limit,
  search,
  category,
  available,
}: FetchMenusParams) => {
  return useQuery({
    queryKey: ["user-menus", { page, limit, search, category, available }],
    queryFn: getAllMenu,
  });
};
```

## useGetAllUserWarung

The `useGetAllUserWarung` hook is used to fetch all user warungs. This hook utilizes `useQuery` from `@tanstack/react-query` to fetch data asynchronously from the warung service.


```javascript
import { useQuery } from "@tanstack/react-query";
import { FetchWarungsParams } from "@/schemas/warungSchema";
import { getAllWarungs } from "@/services/warungServices";

export const useGetAllUserWarung = ({
 page,
 limit,
 search,
}: FetchWarungsParams) => {
 return useQuery({
  queryKey: ["user-warungs-menu", { page, limit, search }],
  queryFn: getAllWarungs,
 });
};
```

# Layout Components

This documentation provides an overview of important layout components.


## AuthLayout

The `AuthLayout` component manages user authentication UI, including toggling between login and registration forms. It uses `useState` and `useCallback` hooks for state management and includes components for form input and button actions.

```javascript
import { Button } from "@/components/ui/button";
import { UserAuthForm } from "@/components/custom-form/user-auth-form";
import { useCallback, useState } from "react";

export type Variant = "LOGIN" | "REGISTER";
const AuthLayout = () => {
 const [variant, setVariant] = useState<Variant>("LOGIN");

 const toggleVariant = useCallback(() => {
  setVariant((prevVariant) => (prevVariant === "LOGIN" ? "REGISTER" : "LOGIN"));
 }, []);

 return (
  <div className="container mx-auto flex justify-center items-center">
   {/* UI elements */}
   <UserAuthForm variant={variant} />
   <Button onClick={toggleVariant}>
    {variant === "LOGIN" ? "Register" : "Login"}
   </Button>
  </div>
 );
};

export default AuthLayout;
```

## DashboardLayout

The `DashboardLayout` component organizes the dashboard interface with a sidebar for navigation and breadcrumbs for page tracking. It dynamically displays the current page using `useLocation` from `react-router-dom`.

```javascript
import { DashboardSidebar } from "@/components/ui/sidebar";
import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbLink,
 BreadcrumbList,
 BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Outlet, useLocation } from "react-router-dom";

export function DashboardLayout() {
 const location = useLocation();

 return (
  <div className="flex">
   <DashboardSidebar />
   <div className="flex flex-col">
    {/* Header with breadcrumb */}
    <Breadcrumb>
     <BreadcrumbList>
      <BreadcrumbItem>
       <BreadcrumbLink>Dashboard</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
       <BreadcrumbPage>{location.pathname.substring(1)}</BreadcrumbPage>
      </BreadcrumbItem>
     </BreadcrumbList>
    </Breadcrumb>
    <Outlet />
   </div>
  </div>
 );
}
```
# Loaders Documentation
The loaders `authLoader` and `dashboardLoader`.
## authLoader

`authLoader` is a loader function used to check if an authentication token exists in `localStorage`. If the token is found, the user is redirected to the `/warung` page. If not, the function does nothing and simply returns an empty object.

```javascript
import { redirect } from "react-router-dom";

export async function authLoader() {
  if (localStorage.getItem("token")) {
    return redirect("/warung");
  }
  return {};
}
```

## dashboardLoader

`dashboardLoader` is a loader function used to ensure that users accessing the dashboard are authenticated. If the token is not found in `localStorage`, the user is redirected to the `/auth` page. If the token is found, the function does nothing and simply returns an empty object.

```javascript
import { redirect } from "react-router-dom";

export async function dashboardLoader() {
  if (!localStorage.getItem("token")) {
    return redirect("/auth");
  }
  return {};
}
```

### BillPage Component Overview

The `BillPage` component manages the display and interaction of bill-related data, including pagination, search functionality, and actions on individual bills.

#### Functionality

- **Search and Filter**: Allows users to search bills by entering keywords in the search input.
  
- **Pagination**: Enables navigation through paginated bill data with previous and next page buttons.

- **Actions**: Provides actions such as viewing detailed bill orders, editing bills, and displaying approval status with tooltips for clarity.
```javascript
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreHorizontal,
  Plus,
  SquareCheckIcon,
  SquareMinusIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useGetAllBillsByWarungId } from "@/hooks/useGetBills";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import EditBillForm from "@/components/custom-form/edit-bill-form";

const BillPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [editOpenMore, setEditOpenMore] = useState<boolean>(false);

  const [moreBillDetail, setMoreBillDetail] = useState<
    Omit<BillResponseType, "id" | "total" | "approved" | "createdAt">
  >({
    customerName: "",
    status: "",
    userId: 0,
    warungId: 0,
    orders: [],
    warung: {
      id: 0,
      name: "",
      location: "",
      userId: 0,
    },
  });

  const [billEdit, setBillEdit] = useState<
    Omit<BillResponseType, "warung" | "orders">
  >({
    id: 0,
    total: 0,
    status: "",
    approved: false,
    customerName: "",
    createdAt: "",
    userId: 0,
    warungId: 0,
  });

  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [limit] = useState<number>(
    parseInt(searchParams.get("limit") || "10", 10)
  );

  const { data, isLoading, error, refetch } = useGetAllBillsByWarungId({
    page: page,
    limit: limit,
    search: searchQuery,
    status: "",
    approved: undefined,
  });

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const editBill = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    bill: Omit<BillResponseType, "warung" | "orders">
  ) => {
    e.preventDefault();
    setBillEdit(bill);
    setEditOpen(true);
  };

  const openMoreDetail = (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    bill: Omit<BillResponseType, "id" | "total" | "approved" | "createdAt">
  ) => {
    e.preventDefault();
    setMoreBillDetail(bill);
    setEditOpenMore(true);
  };

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <Dialog open={open} onOpenChange={setOpen}>
                {/* Dialog content */}
              </Dialog>
            </CardHeader>
            <CardContent>
              {!isLoading ? (
                <Table>
                  {/* Table content */}
                </Table>
              ) : (
                <div>Loading...</div>
              )}
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                {/* Pagination and bill count */}
              </div>
              <Pagination>
                <PaginationContent>
                  {/* Pagination controls */}
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default BillPage;
```


Certainly! Here's a README for your React.js component page, explaining its functionality and including relevant code snippets:

---

# MenuPage
The MenuPage component is designed to manage and display a user's menu items within a web application. It integrates various UI components for a seamless user experience.

## Components Used

### Cards

- **Card**: Provides structured content containers for displaying menu items.
- **CardContent**: Renders the content of each card.
- **CardHeader**: Displays the header section of the card.
- **CardTitle**: Shows the title of the menu management section.
- **CardDescription**: Provides a brief description of the menu management functionality.
- **CardFooter**: Displays pagination information and footer content.

```jsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
```

### Pagination

- **Pagination**: Handles navigation through menu pages.
- **PaginationContent**: Displays pagination controls.
- **PaginationItem**: Represents each pagination button.

```jsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
```

### Dialogs

- **Dialog**: Provides modal dialog functionality.
- **DialogContent**: Displays the content within the dialog.
- **DialogHeader**: Shows the header section of the dialog.
- **DialogTitle**: Displays the title of the dialog.
- **DialogDescription**: Provides a description within the dialog.
- **DialogTrigger**: Triggers the dialog to open.

```jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
```

### Icons

Various icons used throughout the component:

```jsx
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  FilterIcon,
  MoreHorizontal,
  Plus,
  SquareCheckIcon,
  SquareMinusIcon,
} from "lucide-react";
```

### Tooltip

- **Tooltip**: Provides additional information on hover.
- **TooltipContent**: Displays the content within the tooltip.
- **TooltipProvider**: Wraps components to enable tooltips.
- **TooltipTrigger**: Triggers the tooltip to display.

```jsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
```

### Button

- **Button**: Handles various actions like adding new items and editing menus.

```jsx
import { Button } from "@/components/ui/button";
```

### Dropdown Menu

- **DropdownMenu**: Displays a dropdown menu for actions.
- **DropdownMenuContent**: Content inside the dropdown menu.
- **DropdownMenuItem**: Represents each item in the dropdown menu.
- **DropdownMenuLabel**: Label for the dropdown menu.
- **DropdownMenuTrigger**: Triggers the dropdown menu to display.

```jsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
```

### Table

- **Table**: Displays tabular data of menu items.
- **TableHeader**: Displays the header row of the table.
- **TableBody**: Contains the body rows of the table.
- **TableCell**: Represents each cell within a table row.
- **TableHead**: Represents headers within a table.

```jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
```

### Tabs

- **Tabs**: Handles tab navigation.
- **TabsContent**: Displays content for each tab.

```jsx
import { Tabs, TabsContent } from "@/components/ui/tabs";
```

### Hooks and Forms

- **useGetAllUserMenu**: Custom hook to fetch all user menus.
- **useGetAllUserWarung**: Custom hook to fetch all user warungs.
- **CreateMenuForm**: Form component for creating new menus.
- **EditMenuForm**: Form component for editing existing menus.

```jsx
import { useGetAllUserMenu } from "@/hooks/useGetMenus";
import { useGetAllUserWarung } from "@/hooks/useGetWarungs";
import CreateMenuForm from "@/components/custom-form/create-menu-form";
import EditMenuForm from "@/components/custom-form/edit-menu-form";
```

## State Management and Functionality

- **useState**: Manages local component state variables.
- **useLocation**: Retrieves the current URL location.
- **Pagination Control**: Implements pagination functionality for navigating through menu items.
- **Dialogs**: Manages dialog states for adding new menus and editing existing ones.

```jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
```

## Example Usage

```jsx
const MenuPage = () => {
  // Component logic here
};

export default MenuPage;
```
Here's a README for your `NotFoundPage` component in React.js:

---

# NotFoundPage Component README
The NotFoundPage component is designed to handle the display of a "404 Not Found" error page within a web application. It provides users with a friendly message and navigation option back to the homepage.

## Components Used

### Icons

- **NotFoundSVGComponent**: Displays an SVG icon for the 404 error page.

```jsx
import { NotFoundSVGComponent } from "@/components/icons";
```

### Button

- **Button**: Provides a button for navigating back to the homepage.

```jsx
import { Button } from "@/components/ui/button";
```

### Routing

- **useNavigate**: Hook from react-router-dom for navigation.

```jsx
import { useNavigate } from "react-router-dom";
```

## Functionality

The component renders a user-friendly 404 error page with the following features:

- **Text Display**: Shows a large "404" heading and descriptive text explaining the error.
- **Navigation Button**: Provides a button that navigates users back to the homepage.
- **Responsive Layout**: Adapts its layout for both desktop and mobile views.

## Example Usage

```jsx
import { useNavigate } from "react-router-dom";
import { NotFoundSVGComponent } from "@/components/icons";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <div className="text-5xl font-dark font-bold">404</div>
          <p className="text-2xl md:text-3xl font-light leading-normal">Sorry we couldn't find this page.</p>
          <p className="mb-8">But don't worry, you can find plenty of other things on our homepage.</p>

          <Button
            variant="outline"
            className="text-white"
            onClick={() => {
              navigate("/homepage"); // Update this to your actual homepage route
            }}
          >
            Back to homepage
          </Button>
        </div>
        <div className="max-w-lg">
          <NotFoundSVGComponent />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
```


---

# OfflineHandler Component

The OfflineHandler component is responsible for monitoring the online/offline status of the application and displaying a message when the user is offline.

## Components Used

### React Hooks

- **useState**: Manages the state of `isOnline`, which tracks whether the user is online or offline.
- **useEffect**: Handles the subscription to online/offline events and cleanup of event listeners.

```jsx
import { useState, useEffect } from "react";
```

## Functionality

The component:

- Initializes `isOnline` state based on the initial value of `navigator.onLine`.
- Subscribes to `online` and `offline` events on the `window` object to update `isOnline` state accordingly.
- Provides feedback to users when the application detects an offline status.

## Example Usage

```jsx
import { useState, useEffect } from "react";

function OfflineHandler() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    // Cleanup function to remove the event listeners
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (!isOnline) {
    return <div>Please connect to a network to use our app.</div>;
  }

  return null;
}

export default OfflineHandler;
```

Here's a README for your `TableA` component in React.js:

---

# Table Component 

The `TableA` component renders a table with product information and actions for each row.

## Components Used

### Lucide Icons

- **MoreHorizontal**: Represents an icon used for actions dropdown.

```jsx
import { MoreHorizontal } from "lucide-react";
```

### Custom UI Components

- **Badge**: Displays status information for products.
- **Button**: Provides interactive elements for dropdown triggers.

```jsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
```

### Dropdown Menu Components

- **DropdownMenu**: Container for dropdown functionality.
- **DropdownMenuTrigger**: Component that triggers the dropdown menu.
- **DropdownMenuContent**: Content of the dropdown menu.
- **DropdownMenuItem**: Individual items within the dropdown menu.
- **DropdownMenuLabel**: Optional label for the dropdown menu.

```jsx
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuLabel,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
```

### Table Components

- **Table**: Container for organizing tabular data.
- **TableHeader**: Container for table header rows.
- **TableBody**: Container for table body rows.
- **TableCell**: Represents a cell within the table.
- **TableHead**: Represents a header cell within the table.
- **TableRow**: Represents a row within the table.

```jsx
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
```

## Functionality

The component:

- Displays product information such as name, status, price, total sales, and creation date.
- Uses badges to indicate the status of each product (e.g., Draft).
- Provides a dropdown menu with actions (Edit, Delete) for each product row using the `DropdownMenu` component.
- Handles responsive design with conditional classes (`hidden`, `sm:table-cell`, `md:table-cell`) to adjust visibility of table columns.

## Example Usage

```jsx
import React from "react";

const TableA = () => {
 return (
  <Table>
   <TableHeader>
    <TableRow>
     <TableHead className="hidden w-[100px] sm:table-cell">
      <span className="sr-only">Image</span>
     </TableHead>
     <TableHead>Name</TableHead>
     <TableHead>Status</TableHead>
     <TableHead className="hidden md:table-cell">Price</TableHead>
     <TableHead className="hidden md:table-cell">Total Sales</TableHead>
     <TableHead className="hidden md:table-cell">Created at</TableHead>
     <TableHead>
      <span className="sr-only">Actions</span>
     </TableHead>
    </TableRow>
   </TableHeader>
   <TableBody>
    <TableRow>
     <TableCell className="hidden sm:table-cell">
      <img
       alt="Product image"
       className="aspect-square rounded-md object-cover"
       height="64"
       src="/placeholder.svg"
       width="64"
      />
     </TableCell>
     <TableCell className="font-medium">Laser Lemonade Machine</TableCell>
     <TableCell>
      <Badge variant="outline">Draft</Badge>
     </TableCell>
     <TableCell className="hidden md:table-cell">$499.99</TableCell>
     <TableCell className="hidden md:table-cell">25</TableCell>
     <TableCell className="hidden md:table-cell">2023-07-12 10:42 AM</TableCell>
     <TableCell>
      <DropdownMenu>
       <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
         <MoreHorizontal className="h-4 w-4" />
         <span className="sr-only">Toggle menu</span>
        </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
       </DropdownMenuContent>
      </DropdownMenu>
     </TableCell>
    </TableRow>
   </TableBody>
  </Table>
 );
};

export default TableA;
```


# WarungPage Component 

The WarungPage component is a dashboard page designed for managing "warung" entries, including adding new entries, editing existing ones, and navigating through paginated results.

## Components Used

### Card

- **Card**: Provides a styled card container for displaying warung information.

```jsx
import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
```

### Dialog

- **Dialog**: Offers modal dialog functionality for adding and editing warung entries.

```jsx
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTrigger,
} from "@/components/ui/dialog";
```

### Pagination

- **Pagination**: Handles pagination for navigating through warung entries.

```jsx
import {
 Pagination,
 PaginationContent,
 PaginationItem,
} from "@/components/ui/pagination";
```

### Input

- **Input**: Provides an input field for searching warung entries.

```jsx
import { Input } from "@/components/ui/input";
```

### Button

- **Button**: Used for various interactive elements like adding, editing, and navigating.

```jsx
import { Button } from "@/components/ui/button";
```

### DropdownMenu

- **DropdownMenu**: Displays a dropdown menu for actions like editing warung entries.

```jsx
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
```

### Table

- **Table**: Presents warung data in a tabular format.

```jsx
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
```

### Tabs

- **Tabs**: Organizes content into tabs for different views within the dashboard.

```jsx
import { Tabs, TabsContent } from "@/components/ui/tabs";
```

### Hooks

- **useGetAllUserWarung**: Custom hook for fetching and managing warung data.

```jsx
import { useGetAllUserWarung } from "@/hooks/useGetWarungs";
```

### External Libraries

- **Leaflet**: Integrates Leaflet for displaying maps.

```jsx
import "leaflet/dist/leaflet.css";
```

## Functionality

The WarungPage component offers the following functionality:

- **Data Management**: Fetches warung data from an API and displays it in a table.
- **Pagination**: Allows users to navigate through multiple pages of warung entries.
- **Search**: Enables searching for specific warung entries by name.
- **Modals**: Uses dialogs for adding new warung entries and editing existing ones.
- **Responsive Layout**: Adapts its layout for different screen sizes, including mobile devices.

## Example Usage

Below is a simplified example of how the WarungPage component is utilized:

```jsx
import { useLocation } from "react-router-dom";
import { useState } from "react";

// Import components and hooks used in the example...

const WarungPage = () => {
 // State variables and hooks used for managing page state...

 // Function for editing a warung entry...

 // Fetching data and handling pagination...

 // Rendering UI components like Tabs, Card, Pagination, etc...

 return (
  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
   {/* Content and UI components as shown in the example */}
  </main>
 );
};

export default WarungPage;
```

## Installation

To get this project up and running on your local environment, follow these steps:

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js (v18 or higher)**: The project is built with Node.js. You must have Node.js version 18 or higher installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).
- **npm (Node Package Manager)**: npm is used to install dependencies. It comes with Node.js, so if you have Node.js installed, you should have npm as well.
- **Git**: While not strictly necessary, the project recommends using Git for version control. If you plan to clone the repository, make sure Git is installed on your system. You can download it from [Git's official website](https://git-scm.com/).
- **Basic knowledge of terminal or command line usage**: Since the installation and running of the project require using the terminal or command line, basic knowledge in this area will be beneficial.

Once you have these prerequisites, you can proceed with the installation instructions below.

### Clone the repository

```bash
git clone https://github.com/KuraoHikari/FE-Dashboard-WarungBuOde.git
cd FE-Dashboard-WarungBuOde
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Set up environment variables:

Create a `.env` file in the root directory and fill it with necessary environment variables:

```
VITE_APP_BASE_URL=http://localhost:3000
```

### Run the application

```bash
npm run dev
# or
yarn dev
```

This will start the Vite development server, and you should be able to access the app on `http://localhost:5173`.

## Deployment

The project has been deployed and can be accessed at the following URL:

- **[FE-warung-bu-ode](https://fe-warung-bu-ode.netlify.app/auth)**.

## Features

- Inventory management: Keep track of your stock and supplies.
- Sales tracking: Monitor your daily, weekly, and monthly sales.
- Responsive design: Accessible on various devices, providing a seamless experience on desktops, tablets, and smartphones.

## Dependencies

This project uses several key technologies and libraries:

- **[Node.js](https://nodejs.org/en/)**: JavaScript runtime.
- **[Vite](https://vitejs.dev/)**: Front-end build tool.
- **[React](https://reactjs.org/)**: Library for building user interfaces.
- **[Shadcn UI](https://shadcn.github.io/)**: UI framework.
- **[KyJS](https://github.com/sindresorhus/ky)**: HTTP client.
- **[React Leaflet](https://react-leaflet.js.org/)**: For maps integration.
- **[TanStack React Query](https://tanstack.com/query/v4)**: For server state management.
- **[React Camera Pro](https://github.com/AdrianAleixandre/react-camera-pro)**: Camera functionality.
- **[Zod](https://github.com/colinhacks/zod)**: Data validation.
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework.
- **[React Hook Form](https://react-hook-form.com/)**: Forms management.
- **[Vite PWA](https://vite-plugin-pwa.netlify.app/)**: Tools to build PWAs with Vite.

## Acknowledgements

Big thanks to everyone who has contributed to the open-source projects used in this application. Special thanks to:

- The React community for continuous support and innovative solutions.
- Contributors of Vite for their blazing fast build tool.

## Contributing

Contributions to the Warung Management App are welcome! If you have suggestions for improvements or bug fixes, please feel free to:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/AmazingFeature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some AmazingFeature').
5. Push to the branch (git push origin feature/AmazingFeature).
6. Open a pull request.


## Authors

- **Kurao Hikari** - _Initial work_ - [KuraoHikari](https://github.com/KuraoHikari)
- **Affu321** https://github.com/Affu321

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
