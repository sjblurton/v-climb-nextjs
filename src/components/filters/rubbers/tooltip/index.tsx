import React, { ReactElement, useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { RubberWithStringDates } from "../../../../interface";
import { tooltips } from "../../../../data/tooltips";

type Props = {
  rubber: RubberWithStringDates;
  children: ReactElement;
};

export const Tooltip = ({ rubber, children }: Props) => {
  const [pros, setPros] = useState([""]);
  const [cons, setCons] = useState([""]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(`stiffness: ${rubber.stiffness}`);
    setPros(tooltips["stiffness"][rubber.stiffness]["PROS"] || [""]);
    setCons(tooltips["stiffness"][rubber.stiffness]["CONS"] || [""]);
  }, []); // eslint-disable-line

  const tooltipText = (
    <>
      <span className="capitalize font-bold">{title}</span>
      <br />
      <span className="mt-1">{rubber.description}</span>
    </>
  );
  return <Tippy content={tooltipText}>{children}</Tippy>;
};
