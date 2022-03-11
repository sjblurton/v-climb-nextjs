import React, { ReactElement, useEffect, useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { RubberWithStringDates, TFeatures } from "../../../../interface";
import { tooltips } from "../../../../data/tooltips";

type Props = {
  type: TFeatures;
  value: string;
  rubber?: RubberWithStringDates;
  children: ReactElement;
};

export const Tooltip = ({ type, value, rubber, children }: Props) => {
  const [pros, setPros] = useState([""]);
  const [cons, setCons] = useState([""]);
  const [title, setTitle] = useState(`${type}: ${value}`);

  useEffect(() => {
    if (
      type === "asymmetry" ||
      type === "midsole" ||
      type === "profile" ||
      type === "rubber"
    ) {
      // @ts-ignore
      setPros(tooltips[type][value]["PROS"] || [""]);
      // @ts-ignore
      setCons(tooltips[type][value]["CONS"] || [""]);
    }
    if (rubber) {
      setTitle(`stiffness: ${rubber.stiffness}`);
      setPros(tooltips["stiffness"][rubber.stiffness]["PROS"] || [""]);
      setCons(tooltips["stiffness"][rubber.stiffness]["CONS"] || [""]);
    }
  }, []); // eslint-disable-line

  if (type === "volume") return <div key={type}>{children}</div>;
  const tooltipText = (
    <div key={type}>
      <span className="capitalize">{title}</span>
      <br />
      <span className="font-bold">Pros: </span>
      <br />
      {pros.map((item, i) => (
        <>
          <span key={i}>{item}</span>
          <br />
        </>
      ))}
      <span className="font-bold">Cons: </span>
      <br />
      {cons.map((item, i) => (
        <>
          <span key={i}>{item}</span>
          <br />
        </>
      ))}
    </div>
  );
  return <Tippy content={tooltipText}>{children}</Tippy>;
};
