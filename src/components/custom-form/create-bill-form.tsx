import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; /*  */
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";

import { Icons } from "../icons";
import { useToast } from "../ui/use-toast";

import { isHTTPError } from "@/api/baseApi";

import { useMutation } from "@tanstack/react-query";

import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  FilterIcon,
  MoreHorizontal,
  Plus,
  SquareCheckIcon,
  SquareMinusIcon,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WarungResponseType } from "@/schemas/warungSchema";

import { BillResponseType, createBillSchema } from "@/schemas/billSchema";
import { createBill } from "@/services/billServices";

import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUserMenuByWarungId } from "@/hooks/useGetMenusByWarungId";

interface CreateBillFormProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [warungId, setWarungId] = React.useState(0);
  const [page, setPage] = React.useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );
  //ignore
  const [limit] = React.useState<number>(
    parseInt(searchParams.get("limit") || "10", 10)
  );
  const [isLoading, setIsLoading] = React.useState(false);
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

  const onChangeWarungIdValue = (value: string) => {
    form.setValue("warungId", value);
    setWarungId(parseInt(value));
  };

  const {
    data,
    isLoading: isLoadingMenu,
    error,
  } = useGetAllUserMenuByWarungId({
    page,
    limit,
    search: searchQuery,
    available: true,
    warungId,
  });
  console.log("🚀 ~ file: create-bill-form.tsx:129 ~ data:", data);

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
                      <Select
                        onValueChange={onChangeWarungIdValue}
                        defaultValue={field.value}
                      >
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bill status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Unpaid">Unpaid</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Partially_paid">
                            Partially Paid
                          </SelectItem>
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
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Bill Approved</FormLabel>
                          <FormDescription>
                            Is the bill approved?
                          </FormDescription>
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

                {!isLoadingMenu ? (
                  <>
                    <Table className="hidden md:table w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">image</span>
                          </TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>desc</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>available</TableHead>
                          <TableHead>category</TableHead>
                          <TableHead>Warung Name</TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data?.data?.map((menu) => {
                          return (
                            <TableRow key={menu.id}>
                              <TableCell className="hidden w-[100px] sm:table-cell">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <img
                                      src={menu.image}
                                      alt={menu.title}
                                      className="w-10 h-10 rounded-lg"
                                    />
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Menu Image</DialogTitle>
                                      <DialogDescription>
                                        <img
                                          src={menu.image}
                                          alt={menu.title}
                                        />
                                      </DialogDescription>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <span>{menu.title}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="hover:bg-gray-100"
                                      >
                                        <Eye size={20} />
                                      </Button>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Item Description{" "}
                                      </DialogTitle>
                                      <DialogDescription>
                                        {menu.desc}
                                      </DialogDescription>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              </TableCell>
                              <TableCell>
                                <span>{menu.price}</span>
                              </TableCell>
                              <TableCell className="">
                                {menu.available ? (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <SquareCheckIcon className="text-green-500 h-8 w-8" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Available</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ) : (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <SquareMinusIcon className="text-red-500 h-8 w-8" />
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Not Available</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </TableCell>
                              <TableCell>
                                <span>{menu.category}</span>
                              </TableCell>
                              <TableCell>
                                <span>{menu.warung.name}</span>
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">
                                        Toggle menu
                                      </span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </>
                ) : (
                  "Loading...."
                )}
                <Button className="mt-4" type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
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
