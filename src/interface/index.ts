import { PriceType, StiffnessType, VeganType } from "@prisma/client";

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

export interface BrandInput {
  name: string;
}
