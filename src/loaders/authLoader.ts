import { redirect } from "react-router-dom";

export async function authLoader() {
 if (localStorage.getItem("token")) {
  return redirect("/");
 }
 return {};
}
