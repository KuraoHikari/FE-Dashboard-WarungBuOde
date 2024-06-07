import ky from "ky";
import { useQuery } from "@tanstack/react-query";
import { getAllUserBill } from "@/services/billServices";

interface FetchBillsParams {
  warungId: number;
  page: number;
  limit: number;
  search?: string;
  status?: string;
  approved?: boolean;
}

interface Bill {
  id: number;
  total: number;
  status: string;
  approved: boolean;
  customerName: string;
  createdAt: string;
  // Tambahkan properti lainnya sesuai kebutuhan
}

interface FetchBillsResponse {
  data: Bill[];
  page: number;
  totalPages: number;
  // Tambahkan properti lainnya sesuai kebutuhan
}

export const useBills = ({
  warungId,
  page,
  limit,
  search,
  status,
  approved,
}: FetchBillsParams) => {
  return useQuery({
    queryKey: ["posts", { warungId, page, limit, search, status, approved }],
    queryFn: getAllUserBill,
  });
};
