"use client";

import Header from "@/components/header";
import Link from "next/link";
import Alert from "@/components/alert";
import { useState } from "react";
import { registerAction } from "./registerAction";
import Loader from "@/components/loader";
import { redirect } from "next/navigation";

export default function Register() {
  if (localStorage.getItem("jwt") && localStorage.getItem("jwt") !== "") {
    redirect("/");
  }

  const [errorAlertState, setErrorAlertState] = useState("invisible");
  const [successAlertState, setSuccessAlertState] = useState("invisible");
  const [showLoader, setShowLoader] = useState("invisible");

  const showAlert = (alertType: string) => {
    setShowLoader("invisible");

    if (alertType === "error") {
      setErrorAlertState("visible");
    }

    if (alertType === "success") {
      setSuccessAlertState("visible");
    }

    setTimeout(() => {
      setSuccessAlertState("invisible");
      setErrorAlertState("invisible");
    }, 4500);
  };

  async function submit(e: FormData) {
    await new Promise((r) => setTimeout(r, 0));
    setShowLoader("visible");
    const success = await registerAction(e);
    if (success === true) {
      showAlert("success");
    } else {
      showAlert("error");
    }
  }

  return (
    <>
      <Header />
      <Loader show={showLoader} />
      <Alert type="error" display={errorAlertState}>
        Registeration Unsuccessfull. Please try again with a different username.
      </Alert>
      <Alert type="success" display={successAlertState}>
        Registeration Successfull! Please login now.
      </Alert>
      <div className="flex flex-col products-center p-4 bg-base-100 rounded-lg shadow-lg justify-center items-center w-1/3 h-auto mt-12 mx-auto *:pt-4 *:pb-4">
        <h1 className="text-3xl font-bold text-white">Register</h1>
        <form className="flex flex-col gap-4" action={(e) => submit(e)}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="username"
              required
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              name="password"
              placeholder="Password"
              required
            />
          </label>
          <button className="btn btn-primary text-white">Continue</button>
        </form>

        <span>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-white text-bold">
            Login
          </Link>
        </span>
      </div>
    </>
  );
}
