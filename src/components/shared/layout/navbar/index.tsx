import React from "react";
import { useRouter } from "next/router";
import { Logo } from "../../../../assets/logo/logo";
import Link from "next/link";
import { SingedIn } from "./signed_in";

export const Navbar = () => {
  const router = useRouter();
  const isAdminPage = router.pathname === "/admin";
  return (
    <nav className="bg-olive-800 shadow-sm px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/" passHref>
          <div className="flex cursor-pointer">
            <Logo />
            <span className="self-center text-2xl font-bold whitespace-nowrap text-slate-50 hover:text-slate-200">
              V-CLIMB
            </span>
          </div>
        </Link>
        <div>
          <Link href="/contact">
            <a className="self-center text-2xl font-bold whitespace-nowrap text-slate-50 hover:text-slate-200 cursor-pointer mr-8">
              Contact Us
            </a>
          </Link>
          <Link href="/guide">
            <a className="self-center text-2xl font-bold whitespace-nowrap text-slate-50 hover:text-slate-200 cursor-pointer mr-8">
              Guide
            </a>
          </Link>
          {isAdminPage && (
            <>
              <SingedIn />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
