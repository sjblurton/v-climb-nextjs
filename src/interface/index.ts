import { PriceType, VeganType } from "@prisma/client";

export interface ShoesCards {
  id: string;
  name: string;
  brandId: string;
  veganType: VeganType;
  image: string;
  price: PriceType;
  slug: string;
}
[];

export interface ShoesCardData extends ShoesCards {
  brand: string;
}
[];

export interface BrandList {
  id: string;
  name: string;
}

export type RubberList = BrandList;

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
