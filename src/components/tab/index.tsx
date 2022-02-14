import { ReactNode } from "react";

type Props = { selected: boolean; children: ReactNode };

export const CustomTab = ({ selected, children }: Props) => {
  const baseStyles =
    "w-full block font-medium text-lg leading-tight uppercase border-x-0 border-t-0 border-b-2 px-6 py-3 my-2 text-olive-50 hover:border-transparent hover:bg-olive-900 focus:border-transparent";
  const selectedStyles = " border-olive-200";
  const notSelectedStyles = " border-transparent";
  return (
    <div
      className={
        selected ? baseStyles + selectedStyles : baseStyles + notSelectedStyles
      }
    >
      {children}
    </div>
  );
};
