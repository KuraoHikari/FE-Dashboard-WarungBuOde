import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";

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

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useGetAllUserMenu } from "@/hooks/useGetMenus";

const MenuPage = () => {
 const { data, isLoading, error } = useGetAllUserMenu({
  page: 1,
  limit: 10,
  search: "",
  category: "",
  available: undefined,
 });
 console.log(data);

 if (isLoading) return "Loading...";
 if (error) return "An error has occurred: " + error.message;
 return (
  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
   <Tabs defaultValue="all">
    <TabsContent value="all">
     <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
       <CardTitle>Menu</CardTitle>
       <CardDescription>
        Manage your menu and view their performance.
       </CardDescription>
      </CardHeader>
      <CardContent>
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
          <TableCell className="hidden md:table-cell">
           2023-07-12 10:42 AM
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
             <DropdownMenuItem>Edit</DropdownMenuItem>
             <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
           </DropdownMenu>
          </TableCell>
         </TableRow>
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
        of <strong>{data?.total}</strong> menu
       </div>
      </CardFooter>
     </Card>
    </TabsContent>
   </Tabs>
  </main>
 );
};

export default MenuPage;
