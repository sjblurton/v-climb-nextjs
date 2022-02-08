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

export interface Shoes {
  brand: string;
  name: string;
  veganType: VeganType;
  price: PriceType;
  volume: VolumeType;
  closure: ClosureType;
  hooking: HookingType;
  asymmetry: AsymmetryType;
  rubber: StiffnessType;
  profile: ProfileType;
  rubber_thickness: RubberThicknessType;
  midsole: StiffnessType;
  ankle_protection: boolean;
  description: string;
  url: string;
  image: string;
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
