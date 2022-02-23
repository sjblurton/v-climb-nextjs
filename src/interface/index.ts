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

export interface BrandPost {
  name: string;
}

export interface RubberPost {
  name: string;
  stiffness: StiffnessType;
  brandId: string;
  description: string;
  image: string;
}

export interface ShoePost {
  name: string;
  slug: string;
  veganType: VeganType;
  price: PriceType;
  volume: VolumeType;
  closure: ClosureType;
  hooking: HookingType;
  asymmetry: AsymmetryType;
  profile: ProfileType;
  rubber_thickness: RubberThicknessType;
  midsole: StiffnessType;
  ankle_protection: boolean;
  description: string;
  url: string;
  image: string;
  rubberId: string;
  brandId: string;
}

export interface ShoePostInput {
  name: string;
  slug: string;
  veganType: VeganType;
  price: PriceType;
  volume: VolumeType;
  closure: ClosureType;
  hooking: HookingType;
  asymmetry: AsymmetryType;
  profile: ProfileType;
  midsole: StiffnessType;
  description: string;
  url: string;
  image: string;
  rubberId: string;
  brandId: string;
  ankle_protection: boolean;
  rubber_thickness: RubberThicknessType;
  "ankle protection"?: "YES" | "NO";
  "rubber thickness"?: RubberThicknessType;
}

export interface DeleteByID {
  id: string;
  name: string;
  type: "BRAND" | "RUBBER" | "SHOE";
  slug?: string;
}

export type TFeatures =
  | "profile"
  | "midsole"
  | "asymmetry"
  | "volume"
  | "rubber"
  | "rubberBrand";
