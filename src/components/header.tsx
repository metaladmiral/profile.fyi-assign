"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectItems } from "@/app/cart/cartSlice";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const activeClass = pathname === href ? "text-white" : "";
  return (
    <Link href={href}>
      <li className={` text-center py-3 ${activeClass}`}>{children}</li>
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

      <nav className="w-80 bg-gray-800 mx-auto shadow-2xl h-12 rounded-lg mt-10">
        <ul className="flex justify-around items-center h-full text-gray-600 text-md cursor-pointer font-bold">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/cart">Cart {itemCount}</NavLink>
        </ul>
      </nav>
    </>
  );
}
