import baseApi from "@/api/baseApi";
import { createBillSchema, updateBillSchema } from "@/schemas/billSchema";
import { z } from "zod";

export const createBill = async (data: z.infer<typeof createBillSchema>, warungId: number) => {
 const response = await baseApi.post(`bill/${warungId}`, { json: data });
 if (!response.ok) {
  throw new Error("Failed to create bill");
 }

 const json = await response.json();

 return json;
};

export const getAllUserBill = async () => {
 const response = await baseApi.get(`bill/all`);
 if (!response.ok) {
  throw new Error("Failed to fetch bill");
 }

 const json = await response.json();

 return json;
};

export const getBillByWarungId = async (warungId: number) => {
 const response = await baseApi.get(`bill/${warungId}`);
 if (!response.ok) {
  throw new Error("Failed to fetch bill");
 }

 const json = await response.json();

 return json;
};

export const getBillDetailById = async (warungId: number, billId: number) => {
 const response = await baseApi.get(`bill/${warungId}/detail/${billId}`);
 if (!response.ok) {
  throw new Error("Failed to fetch bill");
 }

 const json = await response.json();

 return json;
};

export const updateBillStatusOrApproved = async (
 data: z.infer<typeof updateBillSchema>,
 warungId: number,
 billId: number
) => {
 const response = await baseApi.patch(`bill/${warungId}/edit/${billId}`, {
  json: data,
 });
 if (!response.ok) {
  throw new Error("Failed to update bill");
 }

 const json = await response.json();

 return json;
};
