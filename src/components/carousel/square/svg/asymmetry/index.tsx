import { HighAsymmetry } from "./high";
import { LowAsymmetry } from "./low";
import { MediumAsymmetry } from "./medium";

type Props = { value: string };

export const Asymmetry = ({ value }: Props) => {
  if (value === "HIGH") return <HighAsymmetry />;
  if (value === "LOW") return <LowAsymmetry />;
  return <MediumAsymmetry />;
};
