import { PriceType, VeganType } from "@prisma/client";

export const priceConverter = (price: PriceType) => {
  if (price === "ECONOMIC") return "$";
  if (price === "AVERAGE") return "$$";
  return "$$$";
};
export const veganToString = (vegan: VeganType) => {
  if (vegan === "VEGAN") return "confirmed vegan";
  if (vegan === "POSSIBLY") return "possibly vegan";
  return "not vegan";
};
