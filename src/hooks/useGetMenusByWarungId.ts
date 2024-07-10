import { FetchMenusByWarungIdParams } from "@/schemas/menuSchema";
import { getWarungMenu } from "@/services/menuServices";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUserMenuByWarungId = ({
  page,
  limit,
  search,
  warungId,
  available,
}: FetchMenusByWarungIdParams) => {
  return useQuery({
    queryKey: ["warung-menus", { page, limit, search, warungId, available }],
    queryFn: getWarungMenu,
  });
};
