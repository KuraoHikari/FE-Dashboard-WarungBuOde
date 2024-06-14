import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useGetAllBillsByWarungId } from "@/hooks/useGetBills";

const BillPage = () => {
 const { data, isLoading, error } = useGetAllBillsByWarungId({
  warungId: 1,
  page: 1,
  limit: 10,
  search: "",
  status: undefined,
  approved: undefined,
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
       <CardTitle>Bill</CardTitle>
       <CardDescription>
        Manage your bill and view their performance.
       </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
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
      </CardFooter>
     </Card>
    </TabsContent>
   </Tabs>
  </main>
 );
};

export default BillPage;
