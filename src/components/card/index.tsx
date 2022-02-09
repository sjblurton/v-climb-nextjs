import { PriceType, VeganType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { ConfirmedVegan, NotVegan, ProbablyVegan } from "../../assets/icons";
import { ShoesCard } from "../../interface";

type Props = { shoe: ShoesCard; brand: string };

export const Card = ({ shoe, brand }: Props) => {
  const { image, id, name, price, veganType } = shoe;
  const veganImage = (vegan: VeganType) => {
    if (vegan === "VEGAN") return <ConfirmedVegan />;
    if (vegan === "POSSIBLY") return <ProbablyVegan />;
    return <NotVegan />;
  };

  const priceConverter = (price: PriceType) => {
    if (price === "ECONOMIC") return "$";
    if (price === "AVERAGE") return "$$";
    return "$$$";
  };

  return (
    <Link href={`/${brand}/${name}/${id}`} passHref>
      <div className="h-44 w-full max-w-xs gap-1 relative cursor-pointer flex mx-auto flex-1  lg:border-l-0 lg:border-t lg:border-gray-400 bg-olive-50 rounded p-4 justify-center flex-col">
        <div className="absolute top-2 left-2 z-10">
          {veganImage(veganType)}
        </div>
        <div className="gap-1 flex items-center">
          <Image
            width={140}
            height={140}
            layout="fixed"
            src={image}
            alt={name}
            className="flex-auto m-auto"
          />
          <div className="flex-auto my-auto">
            <h3 className="text-gray-900 font-bold text-2xl mb-2 capitalize">
              {brand}
            </h3>
            <h4 className="text-gray-800 font-bold text-xl mb-2 capitalize">
              {name}
            </h4>
            <h6 className="text-gray-700 font-bold text-xl mb-2 capitalize">
              price: {priceConverter(price)}
            </h6>
          </div>
        </div>
      </div>
    </Link>
  );
};
