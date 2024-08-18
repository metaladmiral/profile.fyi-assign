"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
  useEffect(() => {
    if (localStorage.getItem("jwt") && localStorage.getItem("jwt") !== "") {
      localStorage.removeItem("jwt");
    }
  }, []);
  redirect("/auth/login");
}
