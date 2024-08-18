"use client";

import { redirect } from "next/navigation";
export default function Page() {
  if (localStorage.getItem("jwt") && localStorage.getItem("jwt") !== "") {
    localStorage.removeItem("jwt");
  }
  redirect("/auth/login");
}
