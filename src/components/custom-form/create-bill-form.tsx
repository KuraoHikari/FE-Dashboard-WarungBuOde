import { cn } from "@/lib/utils";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

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
import React from "react";

import { Icons } from "../icons";
import { useToast } from "../ui/use-toast";

import { isHTTPError } from "@/api/baseApi";

import { useMutation } from "@tanstack/react-query";

import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MinusSquare,
  PlusSquare,
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
  const [userCart, setUserCart] = React.useState<
    { menuId: number; quantity: number }[] | []
  >([]);
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
      return createBill(data, warungId);
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

  function addItemToCart(item: { menuId: number }) {
    setUserCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (cartItem) => cartItem.menuId === item.menuId
      );
      if (itemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  }
  React.useEffect(() => {
    form.setValue("orders", userCart);
  }, [userCart]);

  React.useMemo(() => {
    setUserCart([]);
  }, [warungId]);

  function removeItemFromCart(item: { menuId: number }) {
    setUserCart((prevCart) => {
      const itemIndex = prevCart.findIndex(
        (cartItem) => cartItem.menuId === item.menuId
      );
      if (itemIndex !== -1) {
        //if quantity is 1, remove from cart
        if (prevCart[itemIndex].quantity === 1) {
          const updatedCart = [...prevCart];
          updatedCart.splice(itemIndex, 1);
          return updatedCart;
        } else {
          const updatedCart = [...prevCart];
          updatedCart[itemIndex].quantity -= 1;
          return updatedCart;
        }
      } else {
        return prevCart;
      }
    });
  }

  function findMenuQty(menuId: number) {
    return userCart.find((item) => item.menuId === menuId)?.quantity || 0;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    createBillMutation.mutate(values);

    setIsLoading(false);
  }

  const onChangeWarungIdValue = (value: string) => {
    form.setValue("warungId", value);
    setWarungId(parseInt(value));
  };

  const { data, isLoading: isLoadingMenu } = useGetAllUserMenuByWarungId({
    page,
    limit,
    search: "",
    available: true,
    warungId,
  });

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
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
                    <Card>
                      <CardContent>
                        <Table className="w-full">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">image</span>
                              </TableHead>
                              <TableHead>Title</TableHead>
                              <TableHead>desc</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>available</TableHead>
                              <TableHead>
                                <span className="sr-only">Add Item</span>
                              </TableHead>
                              <TableHead>qty</TableHead>
                              <TableHead>
                                <span className="sr-only">Remove Item</span>
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
                                  <TableCell className="">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-gray-100"
                                            onClick={() =>
                                              addItemToCart({
                                                menuId: menu.id,
                                              })
                                            }
                                          >
                                            <PlusSquare className="h-8 w-8 hover:text-gray-500" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Add item to Cart</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </TableCell>
                                  <TableCell>
                                    <span>{findMenuQty(menu.id)}</span>
                                  </TableCell>
                                  <TableCell className="">
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            type="button"
                                            disabled={
                                              findMenuQty(menu.id) === 0
                                            }
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-gray-100"
                                            onClick={() =>
                                              removeItemFromCart({
                                                menuId: menu.id,
                                              })
                                            }
                                          >
                                            <MinusSquare className="h-8 w-8 hover:text-gray-500" />
                                          </Button>
                                        </TooltipTrigger>

                                        <TooltipContent>
                                          <p>Remove item to Cart</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </CardContent>
                      <CardFooter>
                        <div className="text-xs text-muted-foreground">
                          Showing{" "}
                          {data?.data?.length !== 0 ? (
                            <strong>1-{data?.data?.length}</strong>
                          ) : (
                            "0"
                          )}{" "}
                          of <strong>{data?.total}</strong> menu
                        </div>

                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={previousPage}
                                disabled={page <= 1}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                            </PaginationItem>
                            {data?.totalPages &&
                              Array.from(
                                { length: data?.totalPages },
                                (_, index) => (
                                  <Button
                                    type="button"
                                    variant={
                                      data?.page !== index + 1
                                        ? "ghost"
                                        : "outline"
                                    }
                                    onClick={() => setPage(index + 1)}
                                    key={index}
                                  >
                                    {index + 1}
                                  </Button>
                                )
                              )}

                            <PaginationItem>
                              <Button
                                type="button"
                                variant="ghost"
                                onClick={nextPage}
                                disabled={
                                  data?.totalPages
                                    ? page >= data?.totalPages
                                    : true
                                }
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </CardFooter>
                    </Card>
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
