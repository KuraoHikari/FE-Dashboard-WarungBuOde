import baseApi, { isHTTPError } from "@/api/baseApi";
import { createWarungSchema, updateWarungSchema } from "@/schemas/warungSchema";
import { z } from "zod";

export const getAllWarungs = async () => {
 try {
  const response = await baseApi.get(`warung`);
  if (!response.ok) {
   throw new Error("Failed to create warung");
  }

  const json = await response.json();

  return json;
 } catch (error) {
  if (isHTTPError(error)) {
   const errorJson = await error.response.json();
   throw new Error(errorJson.message);
  }
  return error;
 }
};

export const createMyWarung = async (data: z.infer<typeof createWarungSchema>) => {
 try {
  const response = await baseApi.post(`warung`, { json: data });
  if (!response.ok) {
   throw new Error("Failed to create warung");
  }

  const json = await response.json();

  return json;
 } catch (error) {
  if (isHTTPError(error)) {
   const errorJson = await error.response.json();
   throw new Error(errorJson.message);
  }
  return error;
 }
};

export const editMyWarungById = async (data: z.infer<typeof updateWarungSchema>, warungId: number) => {
 try {
  const response = await baseApi.patch(`warung/${warungId}`, { json: data });
  if (!response.ok) {
   throw new Error("Failed to edit warung");
  }

  const json = await response.json();

  return json;
 } catch (error) {
  if (isHTTPError(error)) {
   const errorJson = await error.response.json();
   throw new Error(errorJson.message);
  }
  return error;
 }
};

export const getOneWarungById = async (warungId: number) => {
 try {
  const response = await baseApi.get(`warung/${warungId}`);
  if (!response.ok) {
   throw new Error("Failed to get warung");
  }

  const json = await response.json();

  return json;
 } catch (error) {
  if (isHTTPError(error)) {
   const errorJson = await error.response.json();
   throw new Error(errorJson.message);
  }
  return error;
 }
};
