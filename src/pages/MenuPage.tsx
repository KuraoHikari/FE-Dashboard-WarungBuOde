import { useGetAllUserMenu } from "@/hooks/useGetMenus";

const MenuPage = () => {
  const { data, isLoading, error } = useGetAllUserMenu({
    page: 1,
    limit: 10,
  });
  console.log(data);

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  return <div>MenuPage</div>;
};

export default MenuPage;
