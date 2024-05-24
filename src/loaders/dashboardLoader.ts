import { redirect } from "react-router-dom";

export async function dashboardLoader() {
 if (!localStorage.getItem("token")) {
  return redirect("/auth");
 }
 return {};
}
