import { VeganType } from "@prisma/client";
import { ConfirmedVegan, NotVegan, ProbablyVegan } from "../../assets/icons";

export const VeganImage = (vegan: VeganType): JSX.Element => {
  if (vegan === "VEGAN") return <ConfirmedVegan />;
  if (vegan === "POSSIBLY") return <ProbablyVegan />;
  return <NotVegan />;
};
