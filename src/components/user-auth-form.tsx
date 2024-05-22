import * as React from "react";

import { cn } from "@/lib/utils";

import { Variant } from "@/layout/AuthLayout";
import { useForm } from "react-hook-form";
import { loginSchema, registrationSchema } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "./icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
 variant: Variant;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
 const [isLoading, setIsLoading] = React.useState<boolean>(false);

 const formSchema = props.variant === "REGISTER" ? registrationSchema : loginSchema;

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues:
   props.variant === "REGISTER"
    ? {
       email: "",
       password: "",
       // @ts-expect-error cause of the ternary above
       username: "",
      }
    : {
       email: "",
       password: "",
      },
 });

 // 2. Define a submit handler.
 function onSubmit(values: z.infer<typeof formSchema>) {
  setIsLoading(true);
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);
 }

 return (
  <div className={cn("grid gap-6", className)} {...props}>
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
     <div className="grid gap-2">
      <div className="grid gap-1">
       {props.variant === "REGISTER" && (
        <FormField
         control={form.control}
         // @ts-expect-error cause of the ternary above
         name="username"
         render={({ field }) => (
          <FormItem>
           <FormLabel>Username</FormLabel>
           <FormControl>
            <Input placeholder="shadcn" {...field} />
           </FormControl>
           <FormDescription>Your unique username. It must be at least 2 characters long</FormDescription>
           <FormMessage />
          </FormItem>
         )}
        />
       )}
       <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
           <Input type="email" placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>Your email address</FormDescription>
          <FormMessage />
         </FormItem>
        )}
       />
       <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
           <Input type="password" placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription> Your password. It must be at least 8 characters long</FormDescription>
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
}
