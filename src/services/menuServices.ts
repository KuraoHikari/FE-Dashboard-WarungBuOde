import baseApi from "@/api/baseApi";
import { createMenuSchema, updateMenuAvailableSchema, updateMenuSchema } from "@/schemas/menuSchema";

import { z } from "zod";

export const createMenu = async (data: z.infer<typeof createMenuSchema>, warungId: number) => {
 const response = await baseApi.post(`menu/${warungId}`, { json: data });
 if (!response.ok) {
  throw new Error("Failed to create menu");
 }

 const json = await response.json();

 return json;
};
export const getAllMenu = async () => {
 const response = await baseApi.get(`menu`);
 if (!response.ok) {
  throw new Error("Failed to fetch menus");
 }

 const json = await response.json();

 return json;
};
export const getWarungMenu = async (warungId: number) => {
 const response = await baseApi.get(`menu/${warungId}`);
 if (!response.ok) {
  throw new Error("Failed to fetch menus");
 }

 const json = await response.json();

 return json;
};
export const updateMenu = async (data: z.infer<typeof updateMenuSchema>, warungId: number, menuId: number) => {
 const response = await baseApi.patch(`menu/${warungId}/${menuId}`, { json: data });
 if (!response.ok) {
  throw new Error("Failed to update menu");
 }

 const json = await response.json();

 return json;
};
export const updateMenuAvailable = async (
 data: z.infer<typeof updateMenuAvailableSchema>,
 warungId: number,
 menuId: number
) => {
 const response = await baseApi.put(`menu/${warungId}/${menuId}/available`, { json: data });
 if (!response.ok) {
  throw new Error("Failed to update menu");
 }

 const json = await response.json();

 return json;
};

export const getOneMenuById = async (warungId: number, menuId: number) => {
 const response = await baseApi.get(`menu/${warungId}/${menuId}`);
 if (!response.ok) {
  throw new Error("Failed to update menu");
 }

 const json = await response.json();

 return json;
};
