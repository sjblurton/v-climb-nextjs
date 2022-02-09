import { PriceType, VeganType } from "@prisma/client";
import { ConfirmedVegan, NotVegan, ProbablyVegan } from "../assets/icons";

export const veganImage = (vegan: VeganType) => {
  if (vegan === "VEGAN") return ConfirmedVegan;
  if (vegan === "POSSIBLY") return ProbablyVegan;
  return NotVegan;
};

export const priceConverter = (price: PriceType) => {
  if (price === "ECONOMIC") return "$";
  if (price === "AVERAGE") return "$$";
  return "$$$";
};
