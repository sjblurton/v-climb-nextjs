import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => {};
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

export const Button = ({ children, type, disabled, onClick }: Props) => {
  const [classes, setClasses] = useState("btn btn-olive");
  useEffect(() => {
    disabled ? setClasses("btn btn-disabled") : setClasses("btn btn-olive");
  }, [disabled]);

  return (
    <button onClick={onClick} disabled type={type} className={classes}>
      {children}
    </button>
  );
};
