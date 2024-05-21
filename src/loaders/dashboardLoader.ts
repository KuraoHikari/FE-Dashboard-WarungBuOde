import { redirect } from "react-router-dom";

export async function dashboardLoader() {
 if (!localStorage.getItem("access_token")) {
  return redirect("/auth");
 }
 return {};
}
