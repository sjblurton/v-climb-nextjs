import { Thicker } from "./thicker";
import { Thinner } from "./thinner";

type Props = { value: string };

export const Thickness = ({ value }: Props) => {
  if (value === "THICKER") return <Thicker />;
  return <Thinner />;
};
