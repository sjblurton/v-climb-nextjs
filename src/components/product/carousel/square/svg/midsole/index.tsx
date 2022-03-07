import { AverageStiffness } from "./average";
import { SoftMidsole } from "./soft";
import { StiffMidsole } from "./stiff";

type Props = { value: string };

export const Midsole = ({ value }: Props) => {
  if (value === "AVERAGE") return <AverageStiffness />;
  if (value === "SOFT") return <SoftMidsole />;
  return <StiffMidsole />;
};
