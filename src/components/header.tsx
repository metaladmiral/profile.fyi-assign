"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectItems } from "@/redux/slices/cartSlice";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const activeClass = pathname === href ? "text-white" : "";
  return (
    <Link href={href}>
      <li className={` text-center ${activeClass}`}>{children}</li>
    </Link>
  );
}

export default function Header() {
  const items = useAppSelector(selectItems);

  let itemCount = 0;
  for (const key in items) {
    itemCount++;
  }

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
            <a className="tooltip" data-tip="Home">
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
            </a>
          </NavLink>
          <NavLink href="/cart">
            <a className="tooltip" data-tip="Stats">
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
            </a>
          </NavLink>
        </ul>
      </nav>
    </>
  );
}
