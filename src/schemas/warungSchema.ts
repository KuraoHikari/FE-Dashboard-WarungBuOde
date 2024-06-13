import { z } from "zod";

export const createWarungSchema = z.object({
  name: z.string(),
  location: z.string(),
});

export const updateWarungSchema = z.object({
  location: z.string().optional(),
});

export type WarungResponseType = {
  id: number;
  name: string;
  location: string;
  userId: number;
};

export type getAllWarungsResponseType = {
  data: WarungResponseType[];
  page: number;
  totalPages: number;
  // Tambahkan properti lainnya sesuai kebutuhan
};
export type createMyWarungResponseType = WarungResponseType;
export type updateWarungResponseType = WarungResponseType;
export type getOneWarungByIdResponseType = WarungResponseType;
