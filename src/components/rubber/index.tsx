import { Rubber } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = { rubber: Rubber; brand: string };

export const RubberData = ({ rubber, brand }: Props) => {
  const { description, image, name, stiffness } = rubber;
  return (
    <div className="container text-olive-50 my-4">
      <div className="flex items-center gap-3 mb-2">
        <Image
          width={100}
          height={100}
          src={image}
          alt={`${brand}'s ${name} logo`}
        />
        <div>
          <h3>{`${brand}'s ${name} rubber`}</h3>
          <h4>{`${name} rubber has a ${stiffness.toLocaleLowerCase()} stiffness.`}</h4>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};
