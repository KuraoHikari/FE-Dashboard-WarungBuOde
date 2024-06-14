import { useQuery } from "@tanstack/react-query";
import { getAllUserBill } from "@/services/billServices";
import { FetchBillsParams } from "@/schemas/billSchema";

export const useGetAllBillsByWarungId = ({
 warungId,
 page,
 limit,
 search,
 status,
 approved,
}: FetchBillsParams) => {
 return useQuery({
  queryKey: ["user-bills", { warungId, page, limit, search, status, approved }],
  queryFn: getAllUserBill,
 });
};
