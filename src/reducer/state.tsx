import { BrandWithStringDates, ShoeWithStringDates } from "../interface";

export interface AppState {
  filters: { brands: string[] };
  shoes: ShoeWithStringDates[];
  filteredShoes: ShoeWithStringDates[] | undefined;
  brands: BrandWithStringDates[];
}

export const initialAppState: AppState = {
  filters: { brands: [] },
  shoes: [] as ShoeWithStringDates[],
  filteredShoes: undefined,
  brands: [],
};
