import baseApi from "@/api/baseApi";
import { loginSchema, loginSchemaResponseType, registrationSchema, registrationSchemaType } from "@/schemas/authSchema";
import { z } from "zod";

export const registrationUser = async (data: z.infer<typeof registrationSchema>): Promise<registrationSchemaType> => {
 const response = await baseApi.post("auth/register", { json: data });
 if (!response.ok) {
  throw new Error("Failed to Register");
 }

 const json: registrationSchemaType = await response.json();

 return json;
};

export const loginUser = async (data: z.infer<typeof loginSchema>): Promise<loginSchemaResponseType> => {
 const response = await baseApi.post("auth/login", { json: data });

 if (!response.ok) {
  throw new Error("Failed to login");
 }

 const json: loginSchemaResponseType = await response.json();

 return json;
};
