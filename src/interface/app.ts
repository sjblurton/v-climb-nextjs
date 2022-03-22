import * as Types from "@prisma/client";

export type ShoeWithStringDates = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  brandId: string;
  veganType: Types.VeganType;
  image: string;
  price: Types.PriceType;
  slug: string;
  closure: Types.ClosureType;
  asymmetry: Types.AsymmetryType;
  hooking: Types.HookingType;
  midsole: Types.StiffnessType;
  rubberId: string;
  profile: Types.ProfileType;
  rubber_thickness: Types.RubberThicknessType;
  volume: Types.VolumeType;
  description: string;
  ankle_protection: boolean;
  url: string;
};

export type RubberWithStringDates = {
  id: string;
  createdAt: string;
  updatedAt: string;
  brandId: string;
  name: string;
  stiffness: Types.StiffnessType;
  description: string;
  image: string;
};

export type BrandWithStringDates = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type TFeatures =
  | "profile"
  | "midsole"
  | "asymmetry"
  | "volume"
  | "rubber"
  | "rubberBrand";
