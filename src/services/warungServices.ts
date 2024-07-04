import baseApi from "@/api/baseApi";
import {
 createMyWarungResponseType,
 createWarungSchema,
 FetchWarungsParams,
 getAllWarungsResponseType,
 getOneWarungByIdResponseType,
 updateWarungResponseType,
 updateWarungSchema,
} from "@/schemas/warungSchema";
import { QueryFunctionContext } from "@tanstack/react-query";
import { z } from "zod";

export const getAllWarungs = async ({
 queryKey,
}: QueryFunctionContext<
 [string, FetchWarungsParams]
>): Promise<getAllWarungsResponseType> => {
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const [_key, { page, limit, search }] = queryKey;

 const searchParams = new URLSearchParams({
  page: page.toString(),
  limit: limit.toString(),
  search: search || "",
 });
 const response = await baseApi.get(`warung`, {
  searchParams,
  headers: {
   token: `${localStorage.getItem("token")}`,
  },
 });
 if (!response.ok) {
  throw new Error("Failed to create warung");
 }

 const json: getAllWarungsResponseType = await response.json();

 return json;
};

export const createMyWarung = async (
 data: z.infer<typeof createWarungSchema>
): Promise<createMyWarungResponseType> => {
 const response = await baseApi.post(`warung`, {
  headers: {
   token: `${localStorage.getItem("token")}`,
  },
  json: data,
 });
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
 const response = await baseApi.patch(`warung/${warungId}`, {
  headers: {
   token: `${localStorage.getItem("token")}`,
  },
  json: data,
 });
 if (!response.ok) {
  throw new Error("Failed to edit warung");
 }

 const json: updateWarungResponseType = await response.json();

 return json;
};

export const getOneWarungById = async (
 warungId: number
): Promise<getOneWarungByIdResponseType> => {
 const response = await baseApi.get(`warung/${warungId}`);
 if (!response.ok) {
  throw new Error("Failed to get warung");
 }

 const json: getOneWarungByIdResponseType = await response.json();

 return json;
};
