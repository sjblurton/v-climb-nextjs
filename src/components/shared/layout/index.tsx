import { ReactNode } from "react";
import { Navbar } from "./navbar";

type Props = { children: ReactNode };

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </>
  );
};
