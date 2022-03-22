import * as Types from "@prisma/client";

export interface BrandPost {
  name: string;
}

export interface RubberPost {
  name: string;
  stiffness: Types.StiffnessType;
  brandId: string;
  description: string;
  image: string;
}

export interface ShoePost {
  name: string;
  slug: string;
  veganType: Types.VeganType;
  price: Types.PriceType;
  volume: Types.VolumeType;
  closure: Types.ClosureType;
  hooking: Types.HookingType;
  asymmetry: Types.AsymmetryType;
  profile: Types.ProfileType;
  rubber_thickness: Types.RubberThicknessType;
  midsole: Types.StiffnessType;
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
  veganType: Types.VeganType;
  price: Types.PriceType;
  volume: Types.VolumeType;
  closure: Types.ClosureType;
  hooking: Types.HookingType;
  asymmetry: Types.AsymmetryType;
  profile: Types.ProfileType;
  midsole: Types.StiffnessType;
  description: string;
  url: string;
  image: string;
  rubberId: string;
  brandId: string;
  ankle_protection: boolean;
  rubber_thickness: Types.RubberThicknessType;
  "ankle protection"?: "YES" | "NO";
  "rubber thickness"?: Types.RubberThicknessType;
}

export interface DeleteByID {
  id: string;
  name: string;
  type: "BRAND" | "RUBBER" | "SHOE";
  slug?: string;
}
