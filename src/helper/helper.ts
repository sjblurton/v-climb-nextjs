import { PriceType, VeganType } from "@prisma/client";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { DeleteByID } from "../interface";

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

export const deleteById = (
  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  data: DeleteByID,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<
    SetStateAction<{
      id: string;
      name: string;
      type: "BRAND" | "RUBBER" | "SHOE";
    }>
  >
) => {
  e.preventDefault();
  setData(data);
  setIsOpen(true);
};
