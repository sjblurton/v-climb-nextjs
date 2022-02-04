import Image from "next/image";
import { ConfirmedVegan } from "../../assets/icons";
import { shoes } from "../../data/shoeSeedData";
import { Pill } from "./pill";

type Props = {};

export const Card = (props: Props) => {
  return (
    <div className="relative flex-1 align-items-center border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex md:flex-col justify-between leading-normal">
      <Image
        width={140}
        height={140}
        layout="fixed"
        src={shoes[0].image}
        alt={shoes[0].name}
        className="flex-none m-auto"
      />
      <div className="absolute top-2 left-20">
        <ConfirmedVegan />
      </div>
      <div className="my-auto flex-1">
        <h3 className="text-gray-900 font-bold text-2xl mb-2 capitalize">
          {shoes[0].brand}
        </h3>
        <h4 className="text-gray-800 font-bold text-xl mb-2 capitalize">
          {shoes[0].name}
        </h4>
        <h6 className="text-gray-700 font-bold text-xl mb-2 capitalize">
          price: {shoes[0].price}
        </h6>
        <div className="flex">
          <Pill name="Beginner" />
        </div>
      </div>
    </div>
  );
};
