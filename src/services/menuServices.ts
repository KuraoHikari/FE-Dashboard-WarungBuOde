import baseApi from "@/api/baseApi";
import {
 createMenuSchema,
 getAllMenuResponseType,
 getOneMenuByIdResponseType,
 MenuResponseType,
 updateMenuAvailableResponseType,
 updateMenuAvailableSchema,
 updateMenuResponseType,
 updateMenuSchema,
} from "@/schemas/menuSchema";

import { z } from "zod";

export const createMenu = async (
 data: z.infer<typeof createMenuSchema>,
 warungId: number
): Promise<MenuResponseType> => {
 const response = await baseApi.post(`menu/${warungId}`, { json: data });
 if (!response.ok) {
  throw new Error("Failed to create menu");
 }

 const json: MenuResponseType = await response.json();

 return json;
};
export const getAllMenu = async (): Promise<getAllMenuResponseType> => {
 const response = await baseApi.get(`menu`);
 if (!response.ok) {
  throw new Error("Failed to fetch menus");
 }

 const json: getAllMenuResponseType = await response.json();

 return json;
};
export const getWarungMenu = async (warungId: number): Promise<getAllMenuResponseType> => {
 const response = await baseApi.get(`menu/${warungId}`);
 if (!response.ok) {
  throw new Error("Failed to fetch menus");
 }

 const json: getAllMenuResponseType = await response.json();

 return json;
};
export const updateMenu = async (
 data: z.infer<typeof updateMenuSchema>,
 warungId: number,
 menuId: number
): Promise<updateMenuResponseType> => {
 const response = await baseApi.patch(`menu/${warungId}/${menuId}`, { json: data });
 if (!response.ok) {
  throw new Error("Failed to update menu");
 }

 const json: updateMenuResponseType = await response.json();

 return json;
};
export const updateMenuAvailable = async (
 data: z.infer<typeof updateMenuAvailableSchema>,
 warungId: number,
 menuId: number
): Promise<updateMenuAvailableResponseType> => {
 const response = await baseApi.put(`menu/${warungId}/${menuId}/available`, { json: data });
 if (!response.ok) {
  throw new Error("Failed to update menu");
 }

 const json: updateMenuAvailableResponseType = await response.json();

 return json;
};

export const getOneMenuById = async (warungId: number, menuId: number): Promise<getOneMenuByIdResponseType> => {
 const response = await baseApi.get(`menu/${warungId}/${menuId}`);
 if (!response.ok) {
  throw new Error("Failed to update menu");
 }

 const json: getOneMenuByIdResponseType = await response.json();

 return json;
};
