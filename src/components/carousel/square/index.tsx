import Image from "next/image";
import { Asymmetry, Midsole, Profile, Thickness, Volume } from "./svg";

type Props = { title: string; value: string };

export const Square = ({ title, value }: Props) => {
  const selectSvg = () => {
    if (title === "volume")
      return (
        <>
          <Volume />
          <h3 className="font-bold uppercase text-base text-gray-900">
            {value}
          </h3>
        </>
      );
    if (title === "profile")
      return (
        <>
          <Profile value={value} />
          <h3 className="font-bold uppercase text-base text-gray-900">
            {value}
          </h3>
        </>
      );
    if (title === "asymmetry")
      return (
        <>
          <Asymmetry value={value} />
          <h3 className="font-bold uppercase text-base text-gray-900">
            {value}
          </h3>
        </>
      );
    if (title === "rubber")
      return (
        <>
          <Thickness value={value} />
          <h3 className="font-bold uppercase text-base text-gray-900">
            {value}
          </h3>
        </>
      );
    if (title === "midsole")
      return (
        <>
          <Midsole value={value} />
          <h3 className="font-bold uppercase text-base text-gray-900">
            {value}
          </h3>
        </>
      );

    return (
      <>
        <Image
          width={75}
          height={75}
          src={value}
          alt={`logo for the ${value} of rubber.`}
        />
        <h3 className="font-bold uppercase text-base text-gray-900">rubber</h3>
      </>
    );
  };

  return (
    <div className="w-36 h-36 bg-olive-50 rounded p-2 flex flex-col items-center justify-between">
      <h3 className="font-bold uppercase text-base text-gray-900">{title}</h3>
      {selectSvg()}
    </div>
  );
};
