import { useQuery } from "@tanstack/react-query";
import { getAllUserBill } from "@/services/billServices";

interface FetchMenusParams {
  warungId: number;
  page: number;
  limit: number;
  search?: string;
  category?: string;
  available?: boolean;
}

export const useBills = ({
  warungId,
  page,
  limit,
  search,
  category,
  available,
}: FetchMenusParams) => {
  return useQuery({
    queryKey: ["menus", { warungId, page, limit, search, category, available }],
    queryFn: getAllUserBill,
  });
};
