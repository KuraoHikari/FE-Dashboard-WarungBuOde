import baseApi from "@/api/baseApi";
import {
 createMyWarungResponseType,
 createWarungSchema,
 getAllWarungsResponseType,
 getOneWarungByIdResponseType,
 updateWarungResponseType,
 updateWarungSchema,
} from "@/schemas/warungSchema";
import { z } from "zod";

export const getAllWarungs = async (): Promise<getAllWarungsResponseType> => {
 const response = await baseApi.get(`warung`);
 if (!response.ok) {
  throw new Error("Failed to create warung");
 }

 const json: getAllWarungsResponseType = await response.json();

 return json;
};

export const createMyWarung = async (data: z.infer<typeof createWarungSchema>): Promise<createMyWarungResponseType> => {
 const response = await baseApi.post(`warung`, { json: data });
 if (!response.ok) {
  throw new Error("Failed to create warung");
 }

 const json: createMyWarungResponseType = await response.json();

 return json;
};

export const editMyWarungById = async (
 data: z.infer<typeof updateWarungSchema>,
 warungId: number
): Promise<updateWarungResponseType> => {
 const response = await baseApi.patch(`warung/${warungId}`, { json: data });
 if (!response.ok) {
  throw new Error("Failed to edit warung");
 }

 const json: updateWarungResponseType = await response.json();

 return json;
};

export const getOneWarungById = async (warungId: number): Promise<getOneWarungByIdResponseType> => {
 const response = await baseApi.get(`warung/${warungId}`);
 if (!response.ok) {
  throw new Error("Failed to get warung");
 }

 const json: getOneWarungByIdResponseType = await response.json();

 return json;
};
