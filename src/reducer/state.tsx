import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";

export interface AppState {
  filters: { brands: string[]; rubbers: string[]; midsole: string[] };
  shoes: ShoeWithStringDates[];
  filteredShoes: ShoeWithStringDates[];
  brands: BrandWithStringDates[];
  rubbers: RubberWithStringDates[];
  filteredBrands: BrandWithStringDates[];
  filteredRubbers: RubberWithStringDates[];
}

export const initialAppState: AppState = {
  filters: { brands: [], rubbers: [], midsole: [] },
  shoes: [] as ShoeWithStringDates[],
  filteredShoes: [] as ShoeWithStringDates[],
  brands: [],
  rubbers: [],
  filteredBrands: [],
  filteredRubbers: [],
};
