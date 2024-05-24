import baseApi from "@/api/baseApi";
import { createWarungSchema, updateWarungSchema } from "@/schemas/warungSchema";
import { z } from "zod";

export const getAllWarungs = async () => {
 const response = await baseApi.get(`warung`);
 if (!response.ok) {
  throw new Error("Failed to create warung");
 }

 const json = await response.json();

 return json;
};

export const createMyWarung = async (data: z.infer<typeof createWarungSchema>) => {
 const response = await baseApi.post(`warung`, { json: data });
 if (!response.ok) {
  throw new Error("Failed to create warung");
 }

 const json = await response.json();

 return json;
};

export const editMyWarungById = async (data: z.infer<typeof updateWarungSchema>, warungId: number) => {
 const response = await baseApi.patch(`warung/${warungId}`, { json: data });
 if (!response.ok) {
  throw new Error("Failed to edit warung");
 }

 const json = await response.json();

 return json;
};

export const getOneWarungById = async (warungId: number) => {
 const response = await baseApi.get(`warung/${warungId}`);
 if (!response.ok) {
  throw new Error("Failed to get warung");
 }

 const json = await response.json();

 return json;
};
