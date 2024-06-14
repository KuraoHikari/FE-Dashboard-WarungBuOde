import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";

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

const TableA = () => {
 return (
  <Table>
   <TableHeader>
    <TableRow>
     <TableHead className="hidden w-[100px] sm:table-cell">
      <span className="sr-only">img</span>
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
       alt="Product img"
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
