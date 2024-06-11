import { z } from "zod";
import { WarungResponseType } from "./warungSchema";

const Order = z.object({
  menuId: z.number(),
  quantity: z.number(),
});

export const createBillSchema = z.object({
  status: z.string(),
  approved: z.boolean(),
  customerName: z.string(),

  orders: z.array(Order),
});

export const updateBillSchema = z.object({
  status: z.string().optional(),
  approved: z.boolean().optional(),
  customerName: z.string().optional(),
});

export const createPublicBillSchema = z.object({
  customerName: z.string(),

  orders: z.array(Order),
});

export type OrderType = {
  id: number;
  menuId: number;
  billId: number;
  quantity: number;
  total: number;
  createdAt: string;
};

export type BillResponseType = {
  id: number;
  total: number;
  status: string;
  approved: boolean;
  customerName: string;
  createdAt: string;
  userId: number;
  warungId: number;
  orders: OrderType[];
};

export type getBillByWarungIdResponseType = BillResponseType;
export type updateBillResponseType = Omit<BillResponseType, "orders">;

export type QueryKeyGetAllBill = [
  {
    warungId: string;
    page: number;
    limit: number;
    search: string;
    status: string;
    approved: boolean;
  }
];

export interface FetchBillsParams {
  warungId: number;
  page: number;
  limit: number;
  search?: string;
  status?: string;
  approved?: boolean;
}

export interface getAllUserBillResponseType {
  data: BillResponseType & {
    warung: WarungResponseType;
  };
  page: number;
  totalPages: number;
  // Tambahkan properti lainnya sesuai kebutuhan
}
