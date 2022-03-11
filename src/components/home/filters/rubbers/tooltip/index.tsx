import React, { ReactElement } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { RubberWithStringDates } from "../../../../../interface";

type Props = {
  rubber: RubberWithStringDates;
  children: ReactElement;
};

export const Tooltip = ({ rubber, children }: Props) => {
  const tooltipText = (
    <>
      <span className="capitalize font-bold">{`stiffness: ${rubber.stiffness}`}</span>
      <br />
      <span className="mt-1">{rubber.description}</span>
    </>
  );
  return <Tippy content={tooltipText}>{children}</Tippy>;
};
