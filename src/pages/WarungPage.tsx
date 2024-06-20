import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";

import { ChevronLeft, ChevronRight, MoreHorizontal, Plus } from "lucide-react";

import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { useLocation } from "react-router-dom";

import {
 Pagination,
 PaginationContent,
 PaginationItem,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";

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

import { useGetAllUserWarung } from "@/hooks/useGetWarungs";
import { useState } from "react";

import "leaflet/dist/leaflet.css";
import CreateWarungForm from "@/components/custom-form/create-warung-form";
import EditWarungForm from "@/components/custom-form/edit-warung-form";
import { createMyWarungResponseType } from "@/schemas/warungSchema";

const WarungPage = () => {
 const location = useLocation();
 const searchParams = new URLSearchParams(location.search);

 const [open, setOpen] = useState<boolean>(false);
 const [editOpen, setEditOpen] = useState<boolean>(false);
 const [searchQuery, setSearchQuery] = useState<string>("");
 const [warungEdit, setWarungEdit] = useState<createMyWarungResponseType>({
  id: 0,
  name: "",
  location: "",
  userId: 0,
 });
 const [page, setPage] = useState<number>(
  parseInt(searchParams.get("page") || "1", 10)
 );
 //ignore
 const [limit] = useState<number>(
  parseInt(searchParams.get("limit") || "10", 10)
 );

 const editWarung = (
  e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  warung: createMyWarungResponseType
 ) => {
  e.preventDefault();
  console.log(warung);
  setWarungEdit(warung);
  setEditOpen(true);
 };

 // Parse query parameters

 // TypeScript version of updateSearchQuery function

 const { data, isLoading, error, refetch } = useGetAllUserWarung({
  page: page,
  limit: limit,
  search: searchQuery,
 });

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
      <CardHeader className="">
       <Dialog open={open} onOpenChange={setOpen}>
        <div className="sm:flex items-center gap-2 justify-between">
         <div>
          <CardTitle>Warung</CardTitle>
          <CardDescription className="mt-2">
           Manage your warung and view their performance.
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
           Add Warung
          </Button>
         </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[825px]">
         <DialogHeader>
          <DialogTitle>Add Warung</DialogTitle>
          <DialogDescription>Add new warung to your list.</DialogDescription>
         </DialogHeader>
         <CreateWarungForm open={open} setopen={setOpen} refetch={refetch} />
        </DialogContent>
       </Dialog>
      </CardHeader>
      <CardContent>
       {!isLoading ? (
        <>
         <Table className="hidden sm:table w-full">
          <TableHeader>
           <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>

            <TableHead>
             <span className="sr-only">Actions</span>
            </TableHead>
           </TableRow>
          </TableHeader>
          <TableBody>
           {data?.data?.map((warung) => (
            <TableRow key={warung.id}>
             <TableCell className="font-medium">{warung.name}</TableCell>
             <TableCell className="font-medium">{warung.location}</TableCell>
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
                    editWarung(e, warung);
                   }}
                  >
                   Edit
                  </DropdownMenuItem>
                 </DialogTrigger>
                 <DialogContent className="sm:max-w-[825px]">
                  <DialogHeader>
                   <DialogTitle>Edit Warung</DialogTitle>
                   <DialogDescription>
                    Edit your warung information.
                   </DialogDescription>
                  </DialogHeader>
                  <EditWarungForm
                   open={editOpen}
                   setopen={setEditOpen}
                   refetch={refetch}
                   warung={warungEdit}
                  />
                 </DialogContent>
                </Dialog>
               </DropdownMenuContent>
              </DropdownMenu>
             </TableCell>
            </TableRow>
           ))}
          </TableBody>
         </Table>
         <div className="sm:hidden ">
          {data?.data?.map((warung) => (
           <Card key={warung.id} className="my-2">
            <CardHeader>
             <CardTitle>{warung.name}</CardTitle>
            </CardHeader>
            <CardContent>
             <div className="overflow-hidden max-w-[250px]">
              <p className="">{warung.location}</p>
             </div>
            </CardContent>
            <CardFooter>
             <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
               <Button
                variant={"outline"}
                className="w-full"
                onClick={(e) => {
                 editWarung(e, warung);
                }}
               >
                Edit Warung
               </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[350px] sm:max-w-[825px]">
               <DialogHeader>
                <DialogTitle>Edit Warung</DialogTitle>
                <DialogDescription>
                 Edit your warung information.
                </DialogDescription>
               </DialogHeader>
               <EditWarungForm
                open={editOpen}
                setopen={setEditOpen}
                refetch={refetch}
                warung={warungEdit}
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
        of <strong>{data?.total}</strong> warung
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

export default WarungPage;
