import React from "react";
import { useRouter } from "next/router";
import { Logo } from "../../../assets/logo/logo";
import Link from "next/link";
import { SingedIn } from "../../signed_in";

type Props = {};

export const Navbar = (props: Props) => {
  const router = useRouter();
  const isAdminPage = router.pathname === "/admin";
  return (
    <nav className="bg-olive-800 shadow-sm px-2 sm:px-4 py-2.5">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/" passHref>
          <div className="flex cursor-pointer">
            <Logo />
            <span className="self-center text-2xl font-bold whitespace-nowrap text-olive-50">
              V-CLIMB
            </span>
          </div>
        </Link>
        {isAdminPage && (
          <>
            <SingedIn />
          </>
        )}
      </div>
    </nav>
  );
};
