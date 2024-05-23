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
import { useMutation } from "@tanstack/react-query";
import { loginUser, registrationUser } from "@/services/authServices";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
 variant: Variant;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
 const [isLoading, setIsLoading] = React.useState(false);
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

 const loginMutation = useMutation({
  mutationFn: (data: z.infer<typeof loginSchema>) => {
   return loginUser(data);
  },
  onSuccess: (data) => {
   console.log("🚀 ~ UserAuthForm ~ data:", data);

   alert("Transaction created successfully");
  },
  onError: async (error) => {
   console.log("🚀 ~ UserAuthForm ~ error:", error);
  },
 });

 const registerMutation = useMutation({
  mutationFn: (data: z.infer<typeof registrationSchema>) => {
   return registrationUser(data);
  },
  onSuccess: (data) => {
   alert("Transaction created successfully");
  },
  onError: (error) => {
   console.error(error);
  },
 });

 // 2. Define a submit handler.
 function onSubmit(values: z.infer<typeof formSchema>) {
  setIsLoading(true);
  if (props.variant === "REGISTER") {
   // @ts-expect-error cause of the ternary above
   registerMutation.mutate(values);
  } else {
   loginMutation.mutate(values);
  }
  setIsLoading(false);

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
