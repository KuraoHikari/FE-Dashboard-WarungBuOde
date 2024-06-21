import { z } from "zod";
import { WarungResponseType } from "./warungSchema";
import { MenuResponseType } from "./menuSchema";

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
 menu: MenuResponseType;
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
 warung: WarungResponseType;
};

export type getBillByWarungIdResponseType = BillResponseType;
export type updateBillResponseType = Omit<
 BillResponseType,
 "orders" | "warung"
>;

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
 page: number;
 limit: number;
 search?: string;
 status?: string;
 approved?: boolean;
}

export interface getAllUserBillResponseType {
 data: BillResponseType[];
 page: number;
 totalPages: number;
 total: number;
}
