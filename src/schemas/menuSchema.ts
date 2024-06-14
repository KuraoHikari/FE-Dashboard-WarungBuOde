import { z } from "zod";
import { WarungResponseType } from "./warungSchema";

export const createMenuSchema = z.object({
 title: z.string(),
 price: z.coerce.number(),
 desc: z.string(),
 available: z.coerce.boolean(),
 category: z.string(),
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
};

export type getAllMenuResponseType = {
 data: MenuResponseType &
  {
   warung: WarungResponseType;
  }[];
 page: number;
 totalPages: number;
 total: number;
};

export type updateMenuResponseType = MenuResponseType;

export type updateMenuAvailableResponseType = MenuResponseType;

export type getOneMenuByIdResponseType = MenuResponseType;

export interface FetchMenusParams {
 page: number;
 limit: number;
 search?: string;
 category?: string;
 available?: boolean;
}
