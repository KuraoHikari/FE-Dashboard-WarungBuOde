import baseApi from "@/api/baseApi";
import { loginSchema, registrationSchema } from "@/schemas/authSchema";
import { z } from "zod";

interface HTTPError extends Error {
 response: {
  json: () => Promise<{ message: string }>;
 };
}

export const registrationUser = async (data: z.infer<typeof registrationSchema>) => {
 const response = await baseApi.post("auth/register", { json: data });

 const json = await response.json();

 return json;
};

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
 try {
  const response = await baseApi.post("auth/login", { json: data });

  if (!response.ok) {
   console.log("🚀 ~ loginUser ~ response:", response);
   throw new Error("Failed to login");
  }

  const json = await response.json();
  console.log("🚀 ~ loginUser ~ json:", json);

  return json;
 } catch (error: unknown) {
  if (isHTTPError(error)) {
   // Use a type guard to check if error is an HTTPError
   const errorJson = await error.response.json();
   throw new Error(errorJson.message);
  }
  return error;
 }
};

function isHTTPError(error: unknown): error is HTTPError {
 return (error as HTTPError).response?.json !== undefined;
}
