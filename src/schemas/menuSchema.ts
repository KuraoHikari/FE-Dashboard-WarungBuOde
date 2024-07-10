import { z } from "zod";
import { WarungResponseType } from "./warungSchema";

export const createMenuSchema = z.object({
  title: z.string(),
  price: z.coerce.number(),
  desc: z.string(),
  available: z.coerce.boolean(),
  category: z.string(),
  image: z.instanceof(File).optional(),
  warungId: z.string(),
});

export const MenuSchema = z.object({
  title: z.string(),
  price: z.coerce.number(),
  desc: z.string(),
  available: z.coerce.boolean(),
  category: z.string(),
});

export const updateMenuSchema = z.object({
  title: z.string().optional(),
  price: z.coerce.number().optional(),
  desc: z.string().optional(),
  available: z.coerce.boolean().optional(),
  category: z.string().optional(),
});

export const updateMenuAvailableSchema = z.object({
  available: z.coerce.boolean().optional(),
});

export type MenuResponseType = {
  id: number;
  title: string;
  price: number;
  desc: string;
  image: string;
  available: boolean;
  category: string;
  warungId: number;
  userId: number;
  warung: WarungResponseType;
};

export type getAllMenuResponseType = {
  data: MenuResponseType[];
  page: number;
  totalPages: number;
  total: number;
};

export type updateMenuResponseType = Omit<MenuResponseType, "warung">;

export type updateMenuAvailableResponseType = Omit<MenuResponseType, "warung">;

export type getOneMenuByIdResponseType = Omit<MenuResponseType, "warung">;

export interface FetchMenusParams {
  page: number;
  limit: number;
  search?: string;
  category?: string;
  available?: boolean;
}

export interface FetchMenusByWarungIdParams {
  page: number;
  limit: number;
  search?: string;
  warungId: number;
  available?: boolean;
}
