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

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useGetAllBillsByWarungId } from "@/hooks/useGetBills";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { BillResponseType } from "@/schemas/billSchema";
import { Input } from "@/components/ui/input";

const BillPage = () => {
 const location = useLocation();
 const searchParams = new URLSearchParams(location.search);

 const [open, setOpen] = useState<boolean>(false);
 const [editOpen, setEditOpen] = useState<boolean>(false);
 const [searchQuery, setSearchQuery] = useState<string>("");

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
 //ignore
 const [limit] = useState<number>(
  parseInt(searchParams.get("limit") || "10", 10)
 );

 const { data, isLoading, error } = useGetAllBillsByWarungId({
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
 console.log(data);

 if (isLoading) return "Loading...";
 if (error) return "An error has occurred: " + error.message;

 return (
  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
   <Tabs defaultValue="all">
    <TabsContent value="all">
     <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
       {/* <CardTitle>Bill</CardTitle>
       <CardDescription>
        Manage your bill and view their performance.
       </CardDescription> */}
       <Dialog open={open} onOpenChange={setOpen}>
        <div className="sm:flex items-center gap-2 justify-between">
         <div>
          <CardTitle>Bill</CardTitle>
          <CardDescription className="mt-2">
           Manage your bill and view their performance.
          </CardDescription>
          <Input
           className="mt-2"
           type="text"
           placeholder="Search"
           value={searchQuery} // Bind the input value to the searchQuery state
           onChange={(e) => setSearchQuery(e.target.value)}
          />
         </div>
         <DialogTrigger asChild>
          <Button
           variant="outline"
           onSelect={(e) => e.preventDefault()}
           className="w-full mt-2 sm:w-fit sm:mt-0"
          >
           <Plus className="h-4 w-4 me-2" />
           Add Bill
          </Button>
         </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[825px]">
         <DialogHeader>
          <DialogTitle>Add Bill</DialogTitle>
          <DialogDescription>Add new bill to your list.</DialogDescription>
         </DialogHeader>
         {/* <CreateWarungForm open={open} setopen={setOpen} refetch={refetch} /> */}
        </DialogContent>
       </Dialog>
      </CardHeader>
      <CardContent>
       <Table className=" w-full">
        <TableHeader>
         <TableRow>
          <TableHead>Bill ID</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Approved</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Warung</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead>
           <span className="sr-only">Actions</span>
          </TableHead>
         </TableRow>
        </TableHeader>
        <TableBody>
         {data?.data?.map((bill) => {
          return (
           <TableRow key={bill.id}>
            <TableCell>
             <div className="flex items-center">
              <span>{bill.id}</span>
             </div>
            </TableCell>
            <TableCell>
             <span>{bill.total}</span>
            </TableCell>
            <TableCell>
             <Badge>{bill.status}</Badge>
            </TableCell>
            <TableCell>
             {bill.approved ? (
              <TooltipProvider>
               <Tooltip>
                <TooltipTrigger asChild>
                 <SquareCheckIcon className="text-green-500 h-8 w-8" />
                </TooltipTrigger>
                <TooltipContent>
                 <p>Approved</p>
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
                 <p>Decline</p>
                </TooltipContent>
               </Tooltip>
              </TooltipProvider>
             )}
            </TableCell>
            <TableCell>
             <span>{bill.customerName}</span>
            </TableCell>
            <TableCell>
             <span>{bill.warung.name}</span>
            </TableCell>
            <TableCell>
             <Dialog>
              <DialogTrigger asChild>
               <div>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                 <Eye size={20} />
                </Button>
               </div>
              </DialogTrigger>
              <DialogContent>
               <DialogHeader>
                <DialogTitle>Item Orders </DialogTitle>
                <DialogDescription>
                 <Table>
                  <TableHeader>
                   <TableRow>
                    <TableHead>Menu ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                   </TableRow>
                  </TableHeader>
                  <TableBody>
                   {bill.orders.map((order) => {
                    return (
                     <TableRow key={order.id}>
                      <TableCell>
                       <span>{order.menuId}</span>
                      </TableCell>
                      <TableCell>
                       <span>{order.menu.title}</span>
                      </TableCell>
                      <TableCell>
                       <span>{order.total}</span>
                      </TableCell>
                      <TableCell>
                       <span>{order.quantity}</span>
                      </TableCell>
                     </TableRow>
                    );
                   })}
                  </TableBody>
                 </Table>
                </DialogDescription>
               </DialogHeader>
              </DialogContent>
             </Dialog>
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
                 <DropdownMenuItem>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[825px]">
                 <DialogHeader>
                  <DialogTitle>Edit Menu</DialogTitle>
                  <DialogDescription>
                   Edit your menu information.
                  </DialogDescription>
                 </DialogHeader>
                 {/* <EditMenuForm
                  menu={menuEdit}
                  open={editOpen}
                  setopen={setEditOpen}
                  refetch={refetch}
                 /> */}
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
      </CardContent>
      <CardFooter>
       <div className="text-xs text-muted-foreground">
        Showing{" "}
        {data?.data?.length !== 0 ? (
         <strong>1-{data?.data?.length}</strong>
        ) : (
         "0"
        )}{" "}
        of <strong>{data?.total}</strong> bill
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

export default BillPage;
