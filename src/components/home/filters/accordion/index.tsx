import React, { ReactNode, useEffect, useRef, useState } from "react";
import { UpChevron } from "../../../../assets/icons/up-chevron";

type Props = { title: ReactNode; content: ReactNode };

export const Accordion = ({ title, content }: Props) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState("0px");
  const [rotate, setRotate] = useState("transform duration-700 ease");
  const [innerWidth, setInnerWidth] = useState(640);
  const contentSpace = useRef(null);

  const breakpoint = 640;
  useEffect(() => {
    setInnerWidth(window.innerWidth);
    if (title === "Filters" && innerWidth > breakpoint) {
      toggleAccordion();
    }
  }, []); // eslint-disable-line

  function toggleAccordion() {
    setActive((prevState) => !prevState);
    setHeight(active ? "0px" : `2000px`);
    setRotate(
      active
        ? "transform duration-500 ease"
        : "transform duration-500 ease rotate-180"
    );
  }

  return (
    <div className="flex flex-col md:min-w-fit">
      <button
        className="border-b-2 border-olive-400 py-2 box-border appearance-none cursor-pointer gap-4 focus:outline-none flex items-center justify-between"
        onClick={toggleAccordion}
      >
        <div className=" inline-block text-sm font-bold uppercase text-slate-100">
          {title}
        </div>
        <UpChevron
          height="20"
          Width="20"
          className={`${rotate} inline-block`}
        />
      </button>
      <div
        ref={contentSpace}
        style={{ maxHeight: `${height}` }}
        className="transition-max-height duration-700 ease-in-out overflow-hidden"
      >
        <div className="pb-10">{content}</div>
      </div>
    </div>
  );
};
