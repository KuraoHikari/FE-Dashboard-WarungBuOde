import baseApi, { isHTTPError } from "@/api/baseApi";
import { createMenuSchema, updateMenuAvailableSchema, updateMenuSchema } from "@/schemas/menuSchema";

import { z } from "zod";

export const createMenu = async (data: z.infer<typeof createMenuSchema>, warungId: number) => {
 try {
  const response = await baseApi.post(`menu/${warungId}`, { json: data });
  if (!response.ok) {
   throw new Error("Failed to create menu");
  }

  const json = await response.json();

  return json;
 } catch (error: unknown) {
  if (isHTTPError(error)) {
   const errorJson = await error.response.json();
   throw new Error(errorJson.message);
  }
  return error;
 }
};
export const getAllMenu = async () => {
 try {
  const response = await baseApi.get(`menu`);
  if (!response.ok) {
   throw new Error("Failed to fetch menus");
  }

  const json = await response.json();

  return json;
 } catch (error: unknown) {
  if (isHTTPError(error)) {
   const errorJson = await error.response.json();
   throw new Error(errorJson.message);
  }
  return error;
 }
};
export const getWarungMenu = async (warungId: number) => {
 try {
  const response = await baseApi.get(`menu/${warungId}`);
  if (!response.ok) {
   throw new Error("Failed to fetch menus");
  }

  const json = await response.json();

  return json;
 } catch (error: unknown) {
  if (isHTTPError(error)) {
   const errorJson = await error.response.json();
   throw new Error(errorJson.message);
  }
  return error;
 }
};
export const updateMenu = async (data: z.infer<typeof updateMenuSchema>, warungId: number, menuId: number) => {
 try {
  const response = await baseApi.patch(`menu/${warungId}/${menuId}`, { json: data });
  if (!response.ok) {
   throw new Error("Failed to update menu");
  }

  const json = await response.json();

  return json;
 } catch (error: unknown) {
  if (isHTTPError(error)) {
   const errorJson = await error.response.json();
   throw new Error(errorJson.message);
  }
  return error;
 }
};
export const updateMenuAvailable = async (
 data: z.infer<typeof updateMenuAvailableSchema>,
 warungId: number,
 menuId: number
) => {
 try {
  const response = await baseApi.put(`menu/${warungId}/${menuId}/available`, { json: data });
  if (!response.ok) {
   throw new Error("Failed to update menu");
  }

  const json = await response.json();

  return json;
 } catch (error: unknown) {
  if (isHTTPError(error)) {
   const errorJson = await error.response.json();
   throw new Error(errorJson.message);
  }
  return error;
 }
};

export const getOneMenuById = async (warungId: number, menuId: number) => {
 try {
  const response = await baseApi.get(`menu/${warungId}/${menuId}`);
  if (!response.ok) {
   throw new Error("Failed to update menu");
  }

  const json = await response.json();

  return json;
 } catch (error: unknown) {
  if (isHTTPError(error)) {
   const errorJson = await error.response.json();
   throw new Error(errorJson.message);
  }
  return error;
 }
};
