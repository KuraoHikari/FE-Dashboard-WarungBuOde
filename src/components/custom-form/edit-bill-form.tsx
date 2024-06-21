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
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
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
 BillResponseType,
 updateBillResponseType,
 updateBillSchema,
} from "@/schemas/billSchema";
import { updateBillStatusOrApproved } from "@/services/billServices";

interface UpdateBillFormProps extends React.HTMLAttributes<HTMLDivElement> {
 open: boolean;
 setopen: (open: boolean) => void;
 refetch: () => void; // Add this line
 bill: Omit<BillResponseType, "warung" | "orders">;
}

const EditBillForm = ({
 className,
 bill,
 setopen,
 refetch,
 ...rest
}: UpdateBillFormProps) => {
 const { toast } = useToast();

 const [isLoading, setIsLoading] = React.useState(false);
 const formSchema = updateBillSchema;
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   status: bill.status,
   approved: bill.approved,
   customerName: bill.customerName,
  },
 });

 const updateMenuMutation = useMutation({
  mutationFn: async (
   data: z.infer<typeof updateBillSchema>
  ): Promise<updateBillResponseType> => {
   return updateBillStatusOrApproved(data, bill.warungId, bill.id);
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
     description: "Failed to Update Bill",
    });
   }
  },
  onSuccess: () => {
   toast({
    title: "Update Bill Success",
    description: "You have successfully update your bill",
   });
   form.reset();
   refetch();
   setopen(false);
  },
 });

 function onSubmit(values: z.infer<typeof formSchema>) {
  setIsLoading(true);
  updateMenuMutation.mutate(values);
  setIsLoading(false);
 }

 return (
  <div className={cn("grid gap-6", className)} {...rest}>
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     <div className="grid gap-2">
      <div className="grid gap-1">
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
   </Form>
  </div>
 );
};

export default EditBillForm;
