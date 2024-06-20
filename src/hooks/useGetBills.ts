import { useQuery } from "@tanstack/react-query";
import { getAllUserBill } from "@/services/billServices";
import { FetchBillsParams } from "@/schemas/billSchema";

export const useGetAllBillsByWarungId = ({
 page,
 limit,
 search,
 status,
 approved,
}: FetchBillsParams) => {
 return useQuery({
  queryKey: ["user-bills", { page, limit, search, status, approved }],
  queryFn: getAllUserBill,
 });
};
