import { FetchMenusParams } from "@/schemas/menuSchema";
import { getAllMenu } from "@/services/menuServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUserMenu = ({
  page,
  limit,
  search,
  category,
  available,
}: FetchMenusParams) => {
  return useQuery({
    queryKey: ["user-menus", { page, limit, search, category, available }],
    queryFn: getAllMenu,
  });
};
