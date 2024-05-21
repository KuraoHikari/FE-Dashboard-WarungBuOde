import { redirect } from "react-router-dom";

export async function authLoader() {
 if (localStorage.getItem("access_token")) {
  return redirect("/dashboard");
 }
 return {};
}
