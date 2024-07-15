import baseApi from "@/api/baseApi";
import {
  BillResponseType,
  FetchBillsParams,
  createBillSchema,
  getAllUserBillResponseType,
  getBillByWarungIdResponseType,
  updateBillResponseType,
  updateBillSchema,
} from "@/schemas/billSchema";
import { QueryFunctionContext } from "@tanstack/react-query";
import { z } from "zod";

export const createBill = async (
  data: z.infer<typeof createBillSchema>,
  warungId: number
): Promise<BillResponseType> => {
  const response = await baseApi.post(`bill/${warungId}`, {
    json: data,
    headers: {
      token: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create bill");
  }

  const json: BillResponseType = await response.json();
  console.log("🚀 ~ file: billServices.ts:24 ~ json:", json);

  return json;
};

export const getAllUserBill = async ({
  queryKey,
}: QueryFunctionContext<
  [string, FetchBillsParams]
>): Promise<getAllUserBillResponseType> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, { page, limit, search, status, approved }] = queryKey;
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search: search || "",
    status: status || "",
    approved: approved?.toString() !== undefined ? String(approved) : "",
  });
  const response = await baseApi.get(`bill/all`, {
    searchParams,
    headers: {
      token: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch bill");
  }

  const json: getAllUserBillResponseType = await response.json();

  return json;
};

export const getBillByWarungId = async (
  warungId: number
): Promise<getBillByWarungIdResponseType> => {
  const response = await baseApi.get(`bill/${warungId}`, {
    headers: {
      token: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch bill");
  }

  const json: getBillByWarungIdResponseType = await response.json();

  return json;
};

export const getBillDetailById = async (
  warungId: number,
  billId: number
): Promise<BillResponseType> => {
  const response = await baseApi.get(`bill/${warungId}/detail/${billId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch bill");
  }

  const json: BillResponseType = await response.json();

  return json;
};

export const updateBillStatusOrApproved = async (
  data: z.infer<typeof updateBillSchema>,
  warungId: number,
  billId: number
): Promise<updateBillResponseType> => {
  const response = await baseApi.patch(`bill/${warungId}/edit/${billId}`, {
    json: data,
    headers: {
      token: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update bill");
  }

  const json: updateBillResponseType = await response.json();

  return json;
};
