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

export type ShoeWithStringDates = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  brandId: string;
  veganType: VeganType;
  image: string;
  price: PriceType;
  slug: string;
  closure: ClosureType;
  asymmetry: AsymmetryType;
  hooking: HookingType;
  midsole: StiffnessType;
  rubberId: string;
  profile: ProfileType;
  rubber_thickness: RubberThicknessType;
  volume: VolumeType;
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
  stiffness: StiffnessType;
  description: string;
  image: string;
};

export type BrandWithStringDates = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
};

export type ApiError = { error: string };
export interface ShoesCard {
  id: string;
  brandId: string;
  name: string;
  veganType: VeganType;
  image: string;
  price: PriceType;
  slug: string;
}
[];

export interface BrandList {
  id: string;
  name: string;
}

export interface RubberList {
  id: string;
  name: string;
  stiffness: StiffnessType;
  brandId: string;
  description: string;
}

export type GoodFor =
  | "Beginners"
  | "Indoor"
  | "Big Wall"
  | "All Round"
  | "Steep Limestone"
  | "Steep Limestone with Tufas"
  | "Granite"
  | "Vertical Limestone"
  | "Smooth Sandstone"
  | "Coarse Sandstone"
  | "Steep Sandstone"
  | "under 75kg"
  | "over 55kg";

export interface BrandPut {
  name: string;
}
