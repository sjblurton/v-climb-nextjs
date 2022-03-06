import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";

export interface AppState {
  filters: {
    brands: string[];
    rubbers: string[];
    midsole: string[];
    veganType: string[];
    price: string[];
    volume: string[];
    closure: string[];
    hooking: string[];
    asymmetry: string[];
    profile: string[];
    rubber_thickness: string[];
    rubber_stiffness: string[];
  };
  shoes: ShoeWithStringDates[];
  filteredShoes: ShoeWithStringDates[];
  brands: BrandWithStringDates[];
  rubbers: RubberWithStringDates[];
  filteredBrands: BrandWithStringDates[];
  filteredRubbers: RubberWithStringDates[];
  isLoading: boolean;
  limit: number;
  skip: number;
}

export const initialAppState: AppState = {
  filters: {
    brands: [],
    rubbers: [],
    midsole: [],
    veganType: [],
    price: [],
    volume: [],
    closure: [],
    hooking: [],
    asymmetry: [],
    profile: [],
    rubber_thickness: [],
    rubber_stiffness: [],
  },
  shoes: [] as ShoeWithStringDates[],
  filteredShoes: [] as ShoeWithStringDates[],
  brands: [],
  rubbers: [],
  filteredBrands: [],
  filteredRubbers: [],
  isLoading: false,
  limit: 80,
  skip: 0,
};
