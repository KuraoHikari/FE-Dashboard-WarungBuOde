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
 MoreHorizontal,
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
import EditBillForm from "@/components/custom-form/edit-bill-form";

const BillPage = () => {
 const location = useLocation();
 const searchParams = new URLSearchParams(location.search);

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
 //ignore
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
     <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
       {/* <CardTitle>Bill</CardTitle>
       <CardDescription>
        Manage your bill and view their performance.
       </CardDescription> */}

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
       </div>
      </CardHeader>
      <CardContent>
       {!isLoading ? (
        <Table className=" w-full">
         <TableHeader>
          <TableRow>
           <TableHead>Bill ID</TableHead>
           <TableHead>Total</TableHead>
           <TableHead className="hidden md:table-cell">Status</TableHead>
           <TableHead>Approved</TableHead>
           <TableHead className="hidden md:table-cell">Customer Name</TableHead>
           <TableHead className="hidden md:table-cell">Warung</TableHead>
           <TableHead className="hidden md:table-cell">Orders</TableHead>
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
             <TableCell className="hidden md:table-cell">
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
             <TableCell className="hidden md:table-cell">
              <span>{bill.customerName}</span>
             </TableCell>
             <TableCell className="hidden md:table-cell">
              <span>{bill.warung.name}</span>
             </TableCell>
             <TableCell className="hidden md:table-cell">
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
                 <DialogTitle>Item Orders </DialogTitle>

                 <div>
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
                 </div>
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
                  <DropdownMenuItem
                   onClick={(e) => {
                    editBill(e, bill);
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
                  <EditBillForm
                   bill={billEdit}
                   open={editOpen}
                   setopen={setEditOpen}
                   refetch={refetch}
                  />
                 </DialogContent>
                </Dialog>

                <Dialog open={editOpenMore} onOpenChange={setEditOpenMore}>
                 <DialogTrigger asChild>
                  <DropdownMenuItem
                   onClick={(e) => {
                    openMoreDetail(e, bill);
                   }}
                  >
                   Open More
                  </DropdownMenuItem>
                 </DialogTrigger>
                 <DialogContent className="sm:max-w-[825px]">
                  <DialogHeader>
                   <DialogTitle>
                    Customer Name: {moreBillDetail.customerName}
                   </DialogTitle>
                   <div>
                    <div>
                     <p>Warung Name: {moreBillDetail.warung.name}</p>
                     <p>Status: {moreBillDetail.status}</p>
                    </div>
                    <Table>
                     <TableHeader>
                      <TableRow>
                       <TableHead>Name</TableHead>
                       <TableHead>Price</TableHead>
                       <TableHead>Quantity</TableHead>
                      </TableRow>
                     </TableHeader>
                     <TableBody>
                      {moreBillDetail.orders.map((order) => {
                       return (
                        <TableRow key={order.id}>
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
                   </div>
                  </DialogHeader>
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
       ) : (
        <div>Loading...</div>
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
