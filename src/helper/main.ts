import * as Types from "@prisma/client";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { DeleteByID } from "../interface";

export const priceConverter = (price: Types.PriceType) => {
  if (price === "ECONOMIC") return "$";
  if (price === "AVERAGE") return "$$";
  return "$$$";
};
export const veganToString = (vegan: Types.VeganType) => {
  if (vegan === "VEGAN") return "confirmed vegan";
  if (vegan === "POSSIBLY") return "possibly vegan";
  return "not vegan";
};

export const deleteById = (
  e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  data: DeleteByID,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<DeleteByID>>
) => {
  e.preventDefault();
  setData(data);
  setIsOpen(true);
};

export const selectLists = {
  stiffness: Object.keys(Types.StiffnessType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  vegan: Object.keys(Types.VeganType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  price: Object.keys(Types.PriceType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  volume: Object.keys(Types.VolumeType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  closure: Object.keys(Types.ClosureType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  hooking: Object.keys(Types.HookingType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  asymmetry: Object.keys(Types.AsymmetryType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  profile: Object.keys(Types.ProfileType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  rubber_thickness: Object.keys(Types.RubberThicknessType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
};
