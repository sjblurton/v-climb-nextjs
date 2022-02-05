import Image from "next/image";
import { ConfirmedVegan } from "../../assets/icons";
import { shoes } from "../../data/shoeSeedData";
import { Pill } from "./pill";

type Props = {};

export const Card = (props: Props) => {
  return (
    <div className="relative cursor-pointer flex mx-auto max-w-sm sm:max-w-xs flex-1  lg:border-l-0 lg:border-t lg:border-gray-400 bg-olive-50 rounded p-4 flex-row justify-center">
      <div className="absolute top-2 left-20 z-10">
        <ConfirmedVegan />
      </div>
      <div className="flex items-center">
        <Image
          width={140}
          height={140}
          layout="fixed"
          src={shoes[0].image}
          alt={shoes[0].name}
          className="flex-auto m-auto"
        />
        <div className="flex-auto my-auto">
          <h3 className="text-gray-900 font-bold text-2xl mb-2 capitalize">
            {shoes[0].brand}
          </h3>
          <h4 className="text-gray-800 font-bold text-xl mb-2 capitalize">
            {shoes[0].name}
          </h4>
          <h6 className="text-gray-700 font-bold text-xl mb-2 capitalize">
            price: {shoes[0].price}
          </h6>
        </div>
      </div>
      <div className="flex flex-wrap">
        <Pill name="Beginner" />
      </div>
    </div>
  );
};
