import { Asymmetry, Midsole, Profile, Thickness, Volume } from "./svg";

type Props = { title: string; value: string };

export const Square = ({ title, value }: Props) => {
  console.log(title);
  const selectSvg = () => {
    if (title === "volume") return <Volume />;
    if (title === "profile") return <Profile value={value} />;
    if (title === "asymmetry") return <Asymmetry value={value} />;
    if (title === "rubber") return <Thickness value={value} />;
    if (title === "midsole") return <Midsole value={value} />;
  };

  return (
    <div className="w-36 h-36 bg-olive-50 rounded p-2 flex flex-col items-center justify-between">
      <h3 className="font-bold uppercase text-base text-gray-900">{title}</h3>
      {selectSvg()}
      <h3 className="font-bold uppercase text-base text-gray-900">{value}</h3>
    </div>
  );
};
