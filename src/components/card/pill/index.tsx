import React from "react";

type Props = { name: string };

export const Pill = ({ name }: Props) => {
  return (
    <div className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded-full">
      #{name}
    </div>
  );
};
