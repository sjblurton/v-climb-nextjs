import { VeganType } from "@prisma/client";
import Image from "next/image";
import { ConfirmedVegan, NotVegan, ProbablyVegan } from "../../assets/icons";
import { Shoes } from "../../interface";
import { whatIsItGoodFor } from "../../service/recommend";
import { Pill } from "./pill";

type Props = { shoes: Shoes };

export const Card = ({ shoes }: Props) => {
  const veganImage = (vegan: VeganType) => {
    if (vegan === "VEGAN") return <ConfirmedVegan />;
    if (vegan === "POSSIBLY") return <ProbablyVegan />;
    return <NotVegan />;
  };

  return (
    <div className="max-h-80 gap-1 relative cursor-pointer flex mx-auto max-w-sm sm:max-w-xs flex-1  lg:border-l-0 lg:border-t lg:border-gray-400 bg-olive-50 rounded p-4 justify-center flex-col">
      <div className="absolute top-2 left-20 z-10">
        {veganImage(shoes.veganType)}
      </div>
      <div className="gap-1 flex items-center">
        <Image
          width={140}
          height={140}
          layout="fixed"
          src={shoes.image}
          alt={shoes.name}
          className="flex-auto m-auto"
        />
        <div className="flex-auto my-auto">
          <h3 className="text-gray-900 font-bold text-2xl mb-2 capitalize">
            {shoes.brand}
          </h3>
          <h4 className="text-gray-800 font-bold text-xl mb-2 capitalize">
            {shoes.name}
          </h4>
          <h6 className="text-gray-700 font-bold text-xl mb-2 capitalize">
            price: {shoes.price}
          </h6>
        </div>
      </div>
      <div className="flex flex-wrap">
        {whatIsItGoodFor(shoes).map((pill) => (
          <Pill key={pill} name={pill} />
        ))}
      </div>
    </div>
  );
};
