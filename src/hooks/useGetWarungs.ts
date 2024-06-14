import { useQuery } from "@tanstack/react-query";

import { FetchWarungsParams } from "@/schemas/warungSchema";
import { getAllWarungs } from "@/services/warungServices";

export const useGetAllUserWarung = ({
 page,
 limit,
 search,
}: FetchWarungsParams) => {
 return useQuery({
  queryKey: ["user-warungs", { page, limit, search }],
  queryFn: getAllWarungs,
 });
};
