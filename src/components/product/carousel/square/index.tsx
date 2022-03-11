import Image from "next/image";
import { RubberWithStringDates, TFeatures } from "../../../../interface";
import { Tooltip } from "../tooltip";
import { Asymmetry, Midsole, Profile, Thickness, Volume } from "./svg";

type Props = {
  title: TFeatures;
  value: string;
  rubber?: RubberWithStringDates;
};

export const Square = ({ title, value, rubber }: Props) => {
  const selectSvg = () => {
    if (title === "volume")
      return (
        <Tooltip key={title} type={title} value={value}>
          <div className="w-36 h-36 bg-olive-50 rounded p-2 flex flex-col items-center justify-between">
            <h3 className="font-bold uppercase text-base text-gray-900">
              {title}
            </h3>
            <Volume />
            <h3 className="font-bold uppercase text-base text-gray-900 text-center">
              {value}
            </h3>
          </div>
        </Tooltip>
      );
    if (title === "profile")
      return (
        <Tooltip key={title} type={title} value={value}>
          <div className="w-36 h-36 bg-olive-50 rounded p-2 flex flex-col items-center justify-between">
            <h3 className="font-bold uppercase text-base text-gray-900">
              {title}
            </h3>
            <Profile value={value as string} />
            <h3 className="font-bold uppercase text-base text-gray-900 text-center">
              {value}
            </h3>
          </div>
        </Tooltip>
      );
    if (title === "asymmetry")
      return (
        <Tooltip type={title} value={value}>
          <div className="w-36 h-36 bg-olive-50 rounded p-2 flex flex-col items-center justify-between">
            <h3 className="font-bold uppercase text-base text-gray-900">
              {title}
            </h3>
            <Asymmetry value={value as string} />
            <h3 className="font-bold uppercase text-base text-gray-900 text-center">
              {value}
            </h3>
          </div>
        </Tooltip>
      );
    if (title === "rubber")
      return (
        <Tooltip key={title} type={title} value={value}>
          <div className="w-36 h-36 bg-olive-50 rounded p-2 flex flex-col items-center justify-between">
            <h3 className="font-bold uppercase text-base text-gray-900">
              {title}
            </h3>
            <Thickness value={value as string} />
            <h3 className="font-bold uppercase text-base text-gray-900 text-center">
              {value}
            </h3>
          </div>
        </Tooltip>
      );
    if (title === "midsole")
      return (
        <Tooltip key={title} type={title} value={value}>
          <div className="w-36 h-36 bg-olive-50 rounded p-2 flex flex-col items-center justify-between">
            <h3 className="font-bold uppercase text-base text-gray-900">
              {title}
            </h3>
            <Midsole value={value as string} />
            <h3 className="font-bold uppercase text-base text-gray-900 text-center">
              {value}
            </h3>
          </div>
        </Tooltip>
      );
    if (rubber) {
      return (
        <Tooltip key={title} type={title} value={value} rubber={rubber}>
          <div className="w-36 h-36 bg-olive-50 rounded p-2 flex flex-col items-center justify-between">
            <h3 className="font-bold uppercase text-base text-gray-900 text-center">
              rubber
            </h3>
            <Image
              width={75}
              height={75}
              src={rubber.image}
              alt={`logo for the ${rubber.name} of rubber.`}
            />
            <p className="font-bold capitalize text-sm text-gray-900 text-center">
              stiffness: {rubber.stiffness.toLocaleLowerCase()}
            </p>
          </div>
        </Tooltip>
      );
    }
    return (
      <Tooltip key={title} type={title} value={value}>
        <div className="w-36 h-36 bg-olive-50 rounded p-2 flex flex-col items-center justify-between">
          <h3 className="font-bold uppercase text-base text-gray-900">
            {title}
          </h3>
          <Midsole value={value as string} />
          <h3 className="font-bold uppercase text-base text-gray-900 text-center">
            {value}
          </h3>
        </div>
      </Tooltip>
    );
  };

  return selectSvg();
};
