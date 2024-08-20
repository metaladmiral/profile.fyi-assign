"use client";

import { redirect } from "next/navigation";
import Router from "next/router";
import { useEffect } from "react";
export default function Page() {
  useEffect(() => {
    if (localStorage.getItem("jwt") && localStorage.getItem("jwt") !== "") {
      localStorage.removeItem("jwt");
      localStorage.removeItem("cart-storage");
      window.location.reload();
    }
    redirect("/auth/login");
  }, []);
}
