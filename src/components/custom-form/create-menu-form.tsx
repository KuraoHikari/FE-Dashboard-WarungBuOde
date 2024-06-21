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

import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select";
import { WarungResponseType } from "@/schemas/warungSchema";
import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogTrigger,
} from "@/components/ui/dialog";
import CameraExample from "../camera/example";

import { ArrowBigUp, ArrowLeft } from "lucide-react";

function base64ToFile(
 base64: string,
 filename: string,
 mimeType: string = "application/octet-stream"
): File {
 // Decode the base64 string to an array of bytes
 const byteString = atob(base64.split(",")[1]);
 const ab = new ArrayBuffer(byteString.length);
 const ia = new Uint8Array(ab);
 for (let i = 0; i < byteString.length; i++) {
  ia[i] = byteString.charCodeAt(i);
 }

 // Create a blob from the byte array and then convert it to a File
 const blob = new Blob([ab], { type: mimeType });
 const file = new File([blob], filename, { type: mimeType });

 return file;
}
function getImageData(event: React.ChangeEvent<HTMLInputElement>) {
 // FileList is immutable, so we need to create a new one
 const dataTransfer = new DataTransfer();

 // Add newly uploaded images
 Array.from(event.target.files!).forEach((image) =>
  dataTransfer.items.add(image)
 );

 const files = dataTransfer.files;
 const displayUrl = URL.createObjectURL(event.target.files![0]);

 return { files, displayUrl };
}

interface CreateMenuFormProps extends React.HTMLAttributes<HTMLDivElement> {
 open: boolean;
 setopen: (open: boolean) => void;
 refetch: () => void; // Add this line
 warungs: WarungResponseType[] | undefined;
}

const CreateMenuForm = ({
 className,
 setopen,
 refetch,
 warungs,
 ...rest
}: CreateMenuFormProps) => {
 const { toast } = useToast();
 const [image, setImage] = React.useState<string | null>(null);
 const [preview, setPreview] = React.useState("");
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
   warungId: "",
  },
 });

 const setImageValue = async () => {
  if (image === null) {
   return null;
  }

  const file = base64ToFile(image, "image.jpg", "image/jpeg");
  form.setValue("image", file);

  const displayUrl = URL.createObjectURL(file);
  setPreview(displayUrl);
 };

 const createMenuMutation = useMutation({
  mutationFn: async (
   data: z.infer<typeof createMenuSchema>
  ): Promise<MenuResponseType> => {
   return createMenu(data, Number(data.warungId));
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

  createMenuMutation.mutate(values);

  setIsLoading(false);
 }

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
           <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
             <SelectTrigger>
              <SelectValue placeholder="Select a warung" />
             </SelectTrigger>
            </FormControl>
            <SelectContent>
             {warungs?.map((warung) => (
              <SelectItem key={warung.id} value={String(warung.id)}>
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
           <FormLabel>Food Category</FormLabel>
           <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
             <SelectTrigger>
              <SelectValue placeholder="Select a food category" />
             </SelectTrigger>
            </FormControl>
            <SelectContent>
             <SelectItem value="makanan">makanan</SelectItem>
             <SelectItem value="minuman">minuman</SelectItem>
            </SelectContent>
           </Select>
           <FormDescription>Your food category</FormDescription>
           <FormMessage />
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
              onChange={(e) => {
               const { displayUrl } = getImageData(e);
               setPreview(displayUrl);
               onChange(e.target.files ? (e.target.files[0] as Blob) : null);
              }}
              onBlur={onBlur}
              name={name}
              ref={ref}
             />
            </div>
           </FormControl>
           <FormDescription>
            Upload an image of the menu item or Take a picture
           </FormDescription>
          </FormItem>
         )}
        />

        {preview && <img src={preview} alt="preview" className="w-44 h-44" />}
        <Dialog>
         <DialogTrigger asChild>
          <Button variant="outline">Take a picture</Button>
         </DialogTrigger>
         <DialogContent className="h-full w-full">
          <div className="h-full w-full">
           <div className="fixed flex right-0  min-w-[130px] min-h-[80px]  bg-black/80 z-40  items-center justify-between p-12 box-border flex-row top-0 w-full h-1/8 sm:p-2.5">
            <DialogClose asChild>
             <ArrowLeft className="w-8 h-8 text-white" />
            </DialogClose>

            <DialogClose asChild>
             <Button type="button" variant="secondary" onClick={setImageValue}>
              Upload <ArrowBigUp className="w-8 h-8 text-white" />
             </Button>
            </DialogClose>
           </div>
           <CameraExample image={image} setImage={setImage} />
          </div>
         </DialogContent>
        </Dialog>
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

export default CreateMenuForm;
