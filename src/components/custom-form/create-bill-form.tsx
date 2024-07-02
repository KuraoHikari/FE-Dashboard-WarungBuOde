import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import React from "react";

import { Icons } from "../icons";
import { useToast } from "../ui/use-toast";

import { isHTTPError } from "@/api/baseApi";

import { useMutation } from "@tanstack/react-query";

import { Checkbox } from "@/components/ui/checkbox";

import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { WarungResponseType } from "@/schemas/warungSchema";

import {
 BillResponseType,
 createBillSchema,
 OrderType,
} from "@/schemas/billSchema";
import { createBill } from "@/services/billServices";
import { getAllMenuResponseType } from "@/schemas/menuSchema";
import { useGetAllUserMenuByWarungId } from "@/hooks/useGetMenusByWarungId";

interface CreateBillFormProps extends React.HTMLAttributes<HTMLDivElement> {
 setopen: (open: boolean) => void;
 refetch: () => void; // Add this line
 warungs: WarungResponseType[] | undefined;
}

const CreateBillForm = ({
 className,
 setopen,
 refetch,
 warungs,
 ...rest
}: CreateBillFormProps) => {
 const { toast } = useToast();
 const [isLoading, setIsLoading] = React.useState(false);
 const [menus, setMenus] = React.useState<getAllMenuResponseType | []>([]);
 const [warungId, setWarungId] = React.useState<number>(0);
 const [itemOrders, setItemOrders] = React.useState<OrderType[] | []>([]);

 const formSchema = createBillSchema;
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   status: "",
   approved: false,
   customerName: "",
   warungId: "",
  },
 });

 const createBillMutation = useMutation({
  mutationFn: async (
   data: z.infer<typeof createBillSchema>
  ): Promise<BillResponseType> => {
   return createBill(data, 1);
  },
  onError: async (error) => {
   if (isHTTPError(error)) {
    const errorJson = await error.response.json();

    toast({
     title: "Error",
     variant: "destructive",
     description: errorJson.message,
    });
   } else {
    toast({
     title: "Error",
     variant: "destructive",
     description: "Failed to Create Menu",
    });
   }
  },
  onSuccess: () => {
   toast({
    title: "Create Menu Success",
    description: "You have successfully create your Menu",
   });
   form.reset();
   refetch();
   setopen(false);
  },
 });

 function onSubmit(values: z.infer<typeof formSchema>) {
  setIsLoading(true);

  createBillMutation.mutate(values);

  setIsLoading(false);
 }

 const { data } = useGetAllUserMenuByWarungId({
  page: 1,
  limit: 10,
  search: "",
  warungId,
 });

 const handleWarungSetup = (value: string) => {
  form.setValue("warungId", value);

  setWarungId(Number(value));
 };

 return (
  <div
   className={cn("grid gap-6 overflow-y-auto h-96 p-2", className)}
   {...rest}
  >
   <Form {...form}>
    {warungs?.length === 0 || warungs === undefined ? (
     <div className="text-center text-lg">
      You need to create a warung first
     </div>
    ) : (
     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-2">
       <div className="grid gap-1">
        <FormField
         control={form.control}
         name="warungId"
         render={({ field }) => (
          <FormItem>
           <FormLabel>Warung</FormLabel>
           <Select onValueChange={handleWarungSetup} defaultValue={field.value}>
            <FormControl>
             <SelectTrigger>
              <SelectValue placeholder="Select a warung" />
             </SelectTrigger>
            </FormControl>
            <SelectContent>
             {warungs?.map((warung) => (
              <SelectItem
               key={warung.id}
               value={String(warung.id)}
               onSelect={() => {
                console.log(warung.id);
               }}
              >
               {warung.name}
              </SelectItem>
             ))}
            </SelectContent>
           </Select>
           <FormDescription>
            Select the warung you want to add a menu to
           </FormDescription>
           <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="status"
         render={({ field }) => (
          <FormItem>
           <FormLabel>Bill Status</FormLabel>
           <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
             <SelectTrigger>
              <SelectValue placeholder="Select bill status" />
             </SelectTrigger>
            </FormControl>
            <SelectContent>
             <SelectItem value="Unpaid">Unpaid</SelectItem>
             <SelectItem value="Pending">Pending</SelectItem>
             <SelectItem value="Paid">Paid</SelectItem>
             <SelectItem value="Partially_paid">Partially Paid</SelectItem>
             <SelectItem value="Overdue">Overdue</SelectItem>
             <SelectItem value="Cancelled">Cancelled</SelectItem>
             <SelectItem value="Refunded">Refunded</SelectItem>
            </SelectContent>
           </Select>
           <FormDescription>Select bill status</FormDescription>
           <FormMessage />
          </FormItem>
         )}
        />
        <FormField
         control={form.control}
         name="approved"
         render={({ field }) => (
          <FormItem>
           <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
             <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
             <FormLabel>Bill Approved</FormLabel>
             <FormDescription>Is the bill approved?</FormDescription>
            </div>
           </FormItem>
          </FormItem>
         )}
        />

        <FormField
         control={form.control}
         name="customerName"
         render={({ field }) => (
          <FormItem>
           <FormLabel>Customer Name</FormLabel>
           <FormControl>
            <Input type="text" placeholder="bu-ode" {...field} />
           </FormControl>
           <FormDescription>Your Customer name</FormDescription>
           <FormMessage />
          </FormItem>
         )}
        />

        <Button className="mt-4" type="submit" disabled={isLoading}>
         {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
         Submit
        </Button>
       </div>
      </div>
     </form>
    )}
   </Form>
  </div>
 );
};

export default CreateBillForm;
