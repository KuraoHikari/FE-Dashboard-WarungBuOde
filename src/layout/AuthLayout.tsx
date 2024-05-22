import { Button, buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

export type Variant = "LOGIN" | "REGISTER";
const AuthLayout = () => {
 const [variant, setVariant] = useState<Variant>("LOGIN");

 const toggleVariant = useCallback(() => {
  if (variant === "LOGIN") {
   setVariant("REGISTER");
  } else {
   setVariant("LOGIN");
  }
 }, [variant]);
 return (
  <>
   <div className="container relative  h-svh flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div className={cn(buttonVariants({ variant: "noHover" }), "absolute right-4 top-4 md:right-8 md:top-8")}>
     {variant === "LOGIN" ? (
      <p className="me-4"> don't have an account? </p>
     ) : (
      <p className="me-4"> Already have an account? </p>
     )}

     {variant === "LOGIN" ? (
      <Button variant={"ghost"} onClick={toggleVariant} className="text-primary">
       Register
      </Button>
     ) : (
      <Button variant={"ghost"} onClick={toggleVariant} className="text-primary">
       Login
      </Button>
     )}
    </div>
    <div
     className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
     style={{
      backgroundImage: `url('/warung.png')`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
     }}
    >
     <div className="relative z-20 flex items-center text-lg font-medium ">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
       className="mr-2 h-6 w-6"
      >
       <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
      </svg>
      Warung Bu Ode
     </div>
     <div className="relative z-20 mt-auto"></div>
     <div className="relative z-20 mt-auto">
      <blockquote className="space-y-2">
       <p className="text-lg">
        &ldquo;Dapatkan semua yang Anda butuhkan untuk mengembangkan bisnis kuliner Anda di satu aplikasi Waung Bu
        Ode.&rdquo;
       </p>
      </blockquote>
     </div>
    </div>
    <div className="lg:p-8 ">
     <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
       <h1 className="text-2xl font-semibold tracking-tight">
        {variant === "REGISTER" ? "Create an account" : "Login to the app"}
       </h1>
       <p className="text-sm text-muted-foreground">
        {" "}
        {variant === "REGISTER"
         ? "Enter your email below to create your account"
         : "Enter your email and password to login in to your account"}
       </p>
      </div>
      <UserAuthForm variant={variant} />
      <p className="px-8 text-center text-sm text-muted-foreground">
       By clicking continue, you agree to our{" "}
       <div>
        <span className="underline underline-offset-4 hover:text-primary">Terms of Service</span> and{" "}
        <span className="underline underline-offset-4 hover:text-primary">Privacy Policy</span>
       </div>
      </p>
     </div>
    </div>
   </div>
  </>
 );
};

export default AuthLayout;
