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
import { createMenuSchema, MenuResponseType } from "@/schemas/menuSchema";
import { createMenu } from "@/services/menuServices";

import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

interface CreateMenuFormProps extends React.HTMLAttributes<HTMLDivElement> {
 open: boolean;
 setopen: (open: boolean) => void;
 refetch: () => void; // Add this line
}

const CreateMenuForm = ({
 className,
 setopen,
 refetch,
 ...rest
}: CreateMenuFormProps) => {
 const { toast } = useToast();

 const [isLoading, setIsLoading] = React.useState(false);
 const formSchema = createMenuSchema;
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   title: "",
   price: 0,
   desc: "",
   available: false,
   category: "",
  },
 });

 const createMenuMutation = useMutation({
  mutationFn: async (
   data: z.infer<typeof createMenuSchema>
  ): Promise<MenuResponseType> => {
   return createMenu(data, 1);
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
     description: "Failed to Create Warung",
    });
   }
  },
  onSuccess: () => {
   toast({
    title: "Create Warung Success",
    description: "You have successfully create your Warung",
   });
   form.reset();
   refetch();
   setopen(false);
  },
 });

 function onSubmit(values: z.infer<typeof formSchema>) {
  setIsLoading(true);
  createMenuMutation.mutate(values);

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
          <FormLabel>Available</FormLabel>
          <FormControl>
           <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormDescription>Is the menu item available?</FormDescription>
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

       <FormField
        control={form.control}
        name="image"
        render={({ field: { onChange, onBlur, name, ref } }) => (
         <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
           <div>
            <Input
             type="file"
             onChange={(e) =>
              onChange(e.target.files ? (e.target.files[0] as Blob) : null)
             }
             onBlur={onBlur}
             name={name}
             ref={ref}
            />

            {/* {form.watch("image") && (
             <img
              className="mt-2 w-32 h-32 object-cover"
              src={URL.createObjectURL(
               form?.watch("image") ? (form?.watch("image") ) : undefined
              )}
              alt="menu"
             />
            )} */}
           </div>
          </FormControl>
          <FormDescription>Upload an image of the menu item</FormDescription>
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

export default CreateMenuForm;
