import baseApi from "@/api/baseApi";
import {
  createMenuSchema,
  FetchMenusByWarungIdParams,
  FetchMenusParams,
  getAllMenuResponseType,
  getOneMenuByIdResponseType,
  MenuResponseType,
  updateMenuAvailableResponseType,
  updateMenuAvailableSchema,
  updateMenuResponseType,
  updateMenuSchema,
} from "@/schemas/menuSchema";
import { QueryFunctionContext } from "@tanstack/react-query";

import { z } from "zod";

export const createMenu = async (
  data: z.infer<typeof createMenuSchema>,
  warungId: number
): Promise<MenuResponseType> => {
  //i want to add header and use multipart/form-data
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("price", String(data.price));
  formData.append("desc", data.desc);
  formData.append("category", data.category);
  formData.append("available", String(data.available));
  if (data.image) {
    formData.append("image", data.image);
  }
  const response = await baseApi.post(`menu/${warungId}`, {
    body: formData,
    headers: {
      token: `${localStorage.getItem("token")}`,
    },
  });
  //  const response = await baseApi.post(`menu/${warungId}`, { json: data });
  if (!response.ok) {
    throw new Error("Failed to create menu");
  }

  const json: MenuResponseType = await response.json();

  return json;
};
export const getAllMenu = async ({
  queryKey,
}: QueryFunctionContext<
  [string, FetchMenusParams]
>): Promise<getAllMenuResponseType> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, { page, limit, search, category, available }] = queryKey;

  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search: search || "",
    category: category || "",
    available: available !== undefined ? String(available) : "",
  });
  const response = await baseApi.get(`menu`, {
    searchParams,
    headers: {
      token: `${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch menus");
  }

  const json: getAllMenuResponseType = await response.json();

  return json;
};

export const getWarungMenu = async ({
  queryKey,
}: QueryFunctionContext<
  [string, FetchMenusByWarungIdParams]
>): Promise<getAllMenuResponseType> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, { page, limit, search, warungId, available }] = queryKey;

  if (warungId === 0 || !warungId) {
    const json: getAllMenuResponseType = {
      data: [],
      page: 0,
      totalPages: 0,
      total: 0,
    };

    return json;
  } else {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search: search || "",
      available: available !== undefined ? String(available) : "",
    });
    const response = await baseApi.get(`menu/${warungId}`, {
      searchParams,
      headers: {
        token: `${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch menus");
    }

    const json: getAllMenuResponseType = await response.json();

    return json;
  }
};
export const updateMenu = async (
  data: z.infer<typeof updateMenuSchema>,
  warungId: number,
  menuId: number
): Promise<updateMenuResponseType> => {
  console.log(
    "🚀 ~ file: menuServices.ts ~ line 86 ~ updateMenu ~ data",
    warungId,
    menuId
  );
  const response = await baseApi.patch(`menu/${warungId}/${menuId}`, {
    json: data,
    headers: {
      token: `${localStorage.getItem("token")}`,
    },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to update menu");
  }

  const json: updateMenuResponseType = await response.json();

  return json;
};
export const updateMenuAvailable = async (
  data: z.infer<typeof updateMenuAvailableSchema>,
  warungId: number,
  menuId: number
): Promise<updateMenuAvailableResponseType> => {
  const response = await baseApi.put(`menu/${warungId}/${menuId}/available`, {
    json: data,
  });
  if (!response.ok) {
    throw new Error("Failed to update menu");
  }

  const json: updateMenuAvailableResponseType = await response.json();

  return json;
};

export const getOneMenuById = async (
  warungId: number,
  menuId: number
): Promise<getOneMenuByIdResponseType> => {
  const response = await baseApi.get(`menu/${warungId}/${menuId}`);
  if (!response.ok) {
    throw new Error("Failed to update menu");
  }

  const json: getOneMenuByIdResponseType = await response.json();

  return json;
};
