import { useGetAllBillsByWarungId } from "@/hooks/useGetBills";

const BillPage = () => {
  const { data, isLoading, error } = useGetAllBillsByWarungId({
    warungId: 1,
    page: 1,
    limit: 10,
  });
  console.log(data);

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return <div>BillPage</div>;
};

export default BillPage;
