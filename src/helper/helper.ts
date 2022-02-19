import {
  AsymmetryType,
  ClosureType,
  HookingType,
  PriceType,
  ProfileType,
  RubberThicknessType,
  StiffnessType,
  VeganType,
  VolumeType,
} from "@prisma/client";
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

export const selectLists = {
  stiffness: Object.keys(StiffnessType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  vegan: Object.keys(VeganType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  price: Object.keys(PriceType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  volume: Object.keys(VolumeType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  closure: Object.keys(ClosureType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  hooking: Object.keys(HookingType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  asymmetry: Object.keys(AsymmetryType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  profile: Object.keys(ProfileType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
  rubber_thickness: Object.keys(RubberThicknessType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  }),
};
