"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCartStorage } from "@/zustand/cartStore";
import { useEffect, useState } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  show?: string;
}

function NavLink({ href, children, show }: NavLinkProps) {
  const pathname = usePathname();
  const activeClass = pathname === href ? "text-white" : "";
  return (
    <Link href={href} className={show}>
      <li className={` text-center ${activeClass}`}>{children}</li>
    </Link>
  );
}

export default function Header() {
  const items = useCartStorage((state) => state.cartItems);
  const [showLogout, setShowLogout] = useState("hidden");

  let itemCount = 0;
  for (const key in items) {
    itemCount++;
  }

  useEffect(() => {
    setShowLogout(
      localStorage.getItem("jwt") && localStorage.getItem("jwt") !== ""
        ? `visible`
        : "hidden"
    );
  }, []);

  return (
    <>
      <br />
      <center>
        <h1 className="text-white font-bold mx-auto text-3xl">
          Profile.fyi Assignment
        </h1>
      </center>

      <nav className="w-80 mx-auto h-12 rounded-lg mt-10 flex justify-center">
        <ul className="menu menu-horizontal rounded-box bg-base-100">
          <NavLink href="/">
            <span className="tooltip" data-tip="Home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </span>
          </NavLink>
          <NavLink href="/cart">
            <span className="tooltip" data-tip="Stats">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-green-500 text-white">
                  {itemCount}
                </span>
              </div>
            </span>
          </NavLink>
          <NavLink href="/auth/login">
            <span className="tooltip" data-tip="Stats">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
              </div>
            </span>
          </NavLink>
          <NavLink href="/auth/logout" show={showLogout}>
            <span className="tooltip" data-tip="Stats">
              <div className="indicator">Logout</div>
            </span>
          </NavLink>
        </ul>
      </nav>
    </>
  );
}
