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
import {
 MenuResponseType,
 updateMenuResponseType,
 updateMenuSchema,
} from "@/schemas/menuSchema";
import { updateMenu } from "@/services/menuServices";

import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface UpdateMenuFormProps extends React.HTMLAttributes<HTMLDivElement> {
 open: boolean;
 setopen: (open: boolean) => void;
 refetch: () => void; // Add this line
 menu: Omit<MenuResponseType, "warung">;
}

const EditMenuForm = ({
 className,
 setopen,
 refetch,
 menu,
 ...rest
}: UpdateMenuFormProps) => {
 const { toast } = useToast();

 const [isLoading, setIsLoading] = React.useState(false);
 const formSchema = updateMenuSchema;
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   title: menu.title,
   price: menu.price,
   desc: menu.desc,
   available: menu.available,
   category: menu.category,
  },
 });

 const updateMenuMutation = useMutation({
  mutationFn: async (
   data: z.infer<typeof updateMenuSchema>
  ): Promise<updateMenuResponseType> => {
   return updateMenu(data, menu.warungId, menu.id);
  },
  onError: async (error) => {
   console.log("🚀 ~ onError: ~ error:", error);
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
  console.log("🚀 ~ onSubmit ~ values:", values);
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
        name="title"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Warung Name</FormLabel>
          <FormControl>
           <Input type="text" placeholder="bu-ode" {...field} />
          </FormControl>
          <FormDescription>Your warung name</FormDescription>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
           <Input type="number" placeholder="Enter price" {...field} />
          </FormControl>
          <FormDescription>Enter the price of the menu item</FormDescription>
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="desc"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
           <Textarea placeholder="Enter description" {...field} />
          </FormControl>
          <FormDescription>
           Enter a description of the menu item
          </FormDescription>
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="available"
        render={({ field }) => (
         <FormItem>
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
           <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
           </FormControl>
           <div className="space-y-1 leading-none">
            <FormLabel>Menu Avalability</FormLabel>
            <FormDescription>Is the menu item available?</FormDescription>
           </div>
          </FormItem>
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
           <Input type="text" placeholder="Enter category" {...field} />
          </FormControl>
          <FormDescription>Enter the category of the menu item</FormDescription>
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

export default EditMenuForm;
