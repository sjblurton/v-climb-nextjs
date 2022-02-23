import { ReactNode } from "react";
import { Layout } from "../";

type Props = {
  children: ReactNode;
};

export const Message = ({ children }: Props) => {
  return (
    <>
      <Layout>
        <div className="w-full max-w-sm m-auto h-screen flex align-middle flex-col justify-center">
          <p className="text-olive-50 text-center w-full">{children}</p>
        </div>
      </Layout>
    </>
  );
};
