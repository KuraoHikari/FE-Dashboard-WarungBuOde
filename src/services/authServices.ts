import baseApi, { isHTTPError } from "@/api/baseApi";
import { loginSchema, registrationSchema } from "@/schemas/authSchema";
import { z } from "zod";

export const registrationUser = async (
  data: z.infer<typeof registrationSchema>
) => {
  try {
    const response = await baseApi.post("auth/register", { json: data });
    if (!response.ok) {
      throw new Error("Failed to Register");
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

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
  try {
    const response = await baseApi.post("auth/login", { json: data });

    if (!response.ok) {
      throw new Error("Failed to login");
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
