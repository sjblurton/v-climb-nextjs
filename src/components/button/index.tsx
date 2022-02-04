import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => {};
};

export const Button = ({ children, onClick }: Props) => {
  return (
    <button onClick={onClick} className="btn btn-olive">
      {children}
    </button>
  );
};
