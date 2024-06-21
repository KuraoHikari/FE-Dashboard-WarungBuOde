import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";

import {
 Pagination,
 PaginationContent,
 PaginationItem,
} from "@/components/ui/pagination";

import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";

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
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "@/components/ui/tooltip";

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

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useGetAllUserMenu } from "@/hooks/useGetMenus";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { MenuResponseType } from "@/schemas/menuSchema";
import { Input } from "@/components/ui/input";
import CreateMenuForm from "@/components/custom-form/create-menu-form";
import { useGetAllUserWarung } from "@/hooks/useGetWarungs";
import EditMenuForm from "@/components/custom-form/edit-menu-form";

const MenuPage = () => {
 const location = useLocation();
 const searchParams = new URLSearchParams(location.search);

 const [open, setOpen] = useState<boolean>(false);
 const [editOpen, setEditOpen] = useState<boolean>(false);
 const [searchQuery, setSearchQuery] = useState<string>("");
 const [menuEdit, setMenuEdit] = useState<Omit<MenuResponseType, "warung">>({
  id: 0,
  title: "",
  price: 0,
  desc: "",
  image: "",
  available: false,
  category: "",
  warungId: 0,
  userId: 0,
 });

 const [page, setPage] = useState<number>(
  parseInt(searchParams.get("page") || "1", 10)
 );
 //ignore
 const [limit] = useState<number>(
  parseInt(searchParams.get("limit") || "10", 10)
 );

 const { data, isLoading, error, refetch } = useGetAllUserMenu({
  page,
  limit,
  search: searchQuery,
  category: "",
  available: undefined,
 });

 const { data: warungs } = useGetAllUserWarung({
  page: 1,
  limit: 100,
 });

 const editMenu = (
  e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  menu: Omit<MenuResponseType, "warung">
 ) => {
  e.preventDefault();
  setMenuEdit(menu);
  setEditOpen(true);
 };

 const previousPage = () => {
  setPage(page - 1);
 };

 const nextPage = () => {
  setPage(page + 1);
 };

 if (error) return "An error has occurred: " + error.message;
 return (
  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
   <Tabs defaultValue="all">
    <TabsContent value="all">
     <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
       <Dialog open={open} onOpenChange={setOpen}>
        <div className="sm:flex items-center gap-2 justify-between">
         <div>
          <CardTitle>Menu</CardTitle>
          <CardDescription className="mt-2">
           Manage your menu and view their performance.
          </CardDescription>
          <div className="flex">
           <Input
            className="mt-2"
            type="text"
            placeholder="Search"
            value={searchQuery} // Bind the input value to the searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)}
           />
           <Button variant={"outline"} className="mt-2 ms-2">
            <FilterIcon className="h-4 w-4 me-2" /> Filter
           </Button>
          </div>
         </div>
         <DialogTrigger asChild>
          <Button
           variant="outline"
           onSelect={(e) => e.preventDefault()}
           className="w-full mt-2 sm:w-fit sm:mt-0"
          >
           <Plus className="h-4 w-4 me-2" />
           Add Menu
          </Button>
         </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[825px]">
         <DialogHeader>
          <DialogTitle>Add Menu</DialogTitle>
          <DialogDescription>Add new menu to your list.</DialogDescription>
         </DialogHeader>

         <CreateMenuForm
          warungs={warungs?.data}
          open={open}
          setopen={setOpen}
          refetch={refetch}
         />
        </DialogContent>
       </Dialog>
      </CardHeader>
      <CardContent>
       {!isLoading ? (
        <>
         <Table className="hidden md:table w-full">
          <TableHeader>
           <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
             <span className="sr-only">image</span>
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>desc</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>available</TableHead>
            <TableHead>category</TableHead>
            <TableHead>Warung Name</TableHead>
            <TableHead>
             <span className="sr-only">Actions</span>
            </TableHead>
           </TableRow>
          </TableHeader>
          <TableBody>
           {data?.data?.map((menu) => {
            return (
             <TableRow key={menu.id}>
              <TableCell className="hidden w-[100px] sm:table-cell">
               <Dialog>
                <DialogTrigger asChild>
                 <img
                  src={menu.image}
                  alt={menu.title}
                  className="w-10 h-10 rounded-lg"
                 />
                </DialogTrigger>
                <DialogContent>
                 <DialogHeader>
                  <DialogTitle>Menu Image</DialogTitle>
                  <DialogDescription>
                   <img src={menu.image} alt={menu.title} />
                  </DialogDescription>
                 </DialogHeader>
                </DialogContent>
               </Dialog>
              </TableCell>
              <TableCell>
               <div className="flex items-center">
                <span>{menu.title}</span>
               </div>
              </TableCell>
              <TableCell>
               <Dialog>
                <DialogTrigger asChild>
                 <div>
                  <Button
                   variant="ghost"
                   size="sm"
                   className="hover:bg-gray-100"
                  >
                   <Eye size={20} />
                  </Button>
                 </div>
                </DialogTrigger>
                <DialogContent>
                 <DialogHeader>
                  <DialogTitle>Item Description </DialogTitle>
                  <DialogDescription>{menu.desc}</DialogDescription>
                 </DialogHeader>
                </DialogContent>
               </Dialog>
              </TableCell>
              <TableCell>
               <span>{menu.price}</span>
              </TableCell>
              <TableCell className="">
               {menu.available ? (
                <TooltipProvider>
                 <Tooltip>
                  <TooltipTrigger asChild>
                   <SquareCheckIcon className="text-green-500 h-8 w-8" />
                  </TooltipTrigger>
                  <TooltipContent>
                   <p>Available</p>
                  </TooltipContent>
                 </Tooltip>
                </TooltipProvider>
               ) : (
                <TooltipProvider>
                 <Tooltip>
                  <TooltipTrigger asChild>
                   <SquareMinusIcon className="text-red-500 h-8 w-8" />
                  </TooltipTrigger>
                  <TooltipContent>
                   <p>Not Available</p>
                  </TooltipContent>
                 </Tooltip>
                </TooltipProvider>
               )}
              </TableCell>
              <TableCell>
               <span>{menu.category}</span>
              </TableCell>
              <TableCell>
               <span>{menu.warung.name}</span>
              </TableCell>
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
                 <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                   <DropdownMenuItem
                    onClick={(e) => {
                     editMenu(e, menu);
                    }}
                   >
                    Edit
                   </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[825px]">
                   <DialogHeader>
                    <DialogTitle>Edit Menu</DialogTitle>
                    <DialogDescription>
                     Edit your menu information.
                    </DialogDescription>
                   </DialogHeader>
                   <EditMenuForm
                    menu={menuEdit}
                    open={editOpen}
                    setopen={setEditOpen}
                    refetch={refetch}
                   />
                  </DialogContent>
                 </Dialog>
                </DropdownMenuContent>
               </DropdownMenu>
              </TableCell>
             </TableRow>
            );
           })}
          </TableBody>
         </Table>
         <div className="md:hidden ">
          {data?.data?.map((menu) => (
           <Card
            key={menu.id}
            className="flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl my-2"
           >
            <img
             src={menu.image}
             alt={menu.title}
             className="object-cover w-full rounded-t-lg h-36 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
            />
            <div className="flex flex-col justify-between leading-normal">
             <CardHeader>
              <CardTitle>{menu.title}</CardTitle>
              <CardDescription>{menu.desc}</CardDescription>
             </CardHeader>
             <CardContent className="grid grid-cols-3">
              <div className="mb-4 grid grid-cols-[25px_1fr]  items-start pb-4 last:mb-0 last:pb-0">
               <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
               <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Price</p>
                <p className="text-sm text-muted-foreground">{menu.price}</p>
               </div>
              </div>
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
               <span className="flex h-2 w-2 translate-y-1 rounded-full bg-green-500" />
               <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Category</p>
                <p className="text-sm text-muted-foreground">{menu.category}</p>
               </div>
              </div>
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
               <span className="flex h-2 w-2 translate-y-1 rounded-full bg-red-500" />
               <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Availability</p>
                {menu.available ? (
                 <TooltipProvider>
                  <Tooltip>
                   <TooltipTrigger asChild>
                    <SquareCheckIcon className="text-green-500 h-5 w-5" />
                   </TooltipTrigger>
                   <TooltipContent>
                    <p>Available</p>
                   </TooltipContent>
                  </Tooltip>
                 </TooltipProvider>
                ) : (
                 <TooltipProvider>
                  <Tooltip>
                   <TooltipTrigger asChild>
                    <SquareMinusIcon className="text-red-500 h-5 w-5" />
                   </TooltipTrigger>
                   <TooltipContent>
                    <p>Not Available</p>
                   </TooltipContent>
                  </Tooltip>
                 </TooltipProvider>
                )}
               </div>
              </div>
             </CardContent>
            </div>

            <CardFooter className="w-full">
             <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
               <Button
                variant={"outline"}
                className="w-full"
                onClick={(e) => {
                 editMenu(e, menu);
                }}
               >
                Edit Menu
               </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[350px] sm:max-w-[825px]">
               <DialogHeader>
                <DialogTitle>Edit Warung</DialogTitle>
                <DialogDescription>
                 Edit your warung information.
                </DialogDescription>
               </DialogHeader>
               <EditMenuForm
                menu={menuEdit}
                open={editOpen}
                setopen={setEditOpen}
                refetch={refetch}
               />
              </DialogContent>
             </Dialog>
            </CardFooter>
           </Card>
          ))}
         </div>
        </>
       ) : (
        "Loading...."
       )}
      </CardContent>
      <CardFooter>
       <div className="text-xs text-muted-foreground">
        Showing{" "}
        {data?.data?.length !== 0 ? (
         <strong>1-{data?.data?.length}</strong>
        ) : (
         "0"
        )}{" "}
        of <strong>{data?.total}</strong> menu
       </div>

       <Pagination>
        <PaginationContent>
         <PaginationItem>
          <Button variant="ghost" onClick={previousPage} disabled={page <= 1}>
           <ChevronLeft className="h-4 w-4" />
          </Button>
         </PaginationItem>
         {data?.totalPages &&
          Array.from({ length: data?.totalPages }, (_, index) => (
           <Button
            variant={data?.page !== index + 1 ? "ghost" : "outline"}
            onClick={() => setPage(index + 1)}
            key={index}
           >
            {index + 1}
           </Button>
          ))}

         <PaginationItem>
          <Button
           variant="ghost"
           onClick={nextPage}
           disabled={data?.totalPages ? page >= data?.totalPages : true}
          >
           <ChevronRight className="h-4 w-4" />
          </Button>
         </PaginationItem>
        </PaginationContent>
       </Pagination>
      </CardFooter>
     </Card>
    </TabsContent>
   </Tabs>
  </main>
 );
};

export default MenuPage;
