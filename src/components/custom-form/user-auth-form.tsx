import * as React from "react";

import { cn } from "@/lib/utils";

import { Variant } from "@/layout/AuthLayout";
import { useForm } from "react-hook-form";
import {
 loginSchema,
 loginSchemaResponseType,
 registrationSchema,
 registrationSchemaType,
} from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { Icons } from "../icons";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registrationUser } from "@/services/authServices";
import { isHTTPError } from "@/api/baseApi";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
 variant: Variant;
 toggleVariant: () => void;
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
 const navigate = useNavigate();
 const { toast } = useToast();

 const [isLoading, setIsLoading] = React.useState(false);
 const formSchema =
  props.variant === "REGISTER" ? registrationSchema : loginSchema;

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
  mutationFn: async (
   data: z.infer<typeof loginSchema>
  ): Promise<loginSchemaResponseType> => {
   return loginUser(data);
  },
  onSuccess: (data: { token: string }) => {
   toast({
    title: "Login Success",
    description: "You have successfully logged in",
   });

   localStorage.setItem("token", data.token);

   navigate("/warung");
  },
  onError: async (error: unknown) => {
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
     description: "Failed to login",
    });
   }
  },
 });

 const registerMutation = useMutation({
  mutationFn: (
   data: z.infer<typeof registrationSchema>
  ): Promise<registrationSchemaType> => {
   return registrationUser(data);
  },
  onSuccess: async () => {
   toast({
    title: "Register Success",
    description:
     "You have successfully Register your Account, Continue to log in",
   });

   props.toggleVariant();
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
     description: "Failed to Register",
    });
   }
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
           <FormDescription>
            Your unique username. It must be at least 2 characters long
           </FormDescription>
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
          <FormDescription>
           {" "}
           Your password. It must be at least 8 characters long
          </FormDescription>
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
