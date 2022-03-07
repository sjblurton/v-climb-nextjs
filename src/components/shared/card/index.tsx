import Image from "next/image";
import Link from "next/link";
import { priceConverter } from "../../../helper/helper";
import { ShoesCard } from "../../../interface";
import { VeganImage } from "../";

type Props = { shoe: ShoesCard; brand: string };

export const Card = ({ shoe, brand }: Props) => {
  const { image, slug, name, price, veganType } = shoe;

  return (
    <Link href={`/${slug}`} passHref>
      <div className="h-44 w-full max-w-xs gap-1 relative cursor-pointer flex mx-auto flex-1  lg:border-l-0 lg:border-t lg:border-olive-500 bg-olive-800 rounded p-4 justify-center flex-col">
        <div className="absolute top-2 left-2 z-10">
          {VeganImage(veganType)}
        </div>
        <div className="gap-1 flex items-center">
          <Image
            width={140}
            height={140}
            layout="fixed"
            src={image}
            alt={name}
            className="flex-auto m-auto rounded bg-slate-50"
          />
          <div className="flex-auto my-auto">
            <h3 className="text-slate-50 font-bold text-2xl mb-2 capitalize">
              {brand}
            </h3>
            <h4 className="text-slate-50 font-bold text-xl mb-2 capitalize">
              {name}
            </h4>
            <h6 className="text-slate-200 font-bold text-xl mb-2 capitalize">
              price: {priceConverter(price)}
            </h6>
          </div>
        </div>
      </div>
    </Link>
  );
};
