import { ShoeWithStringDates } from "../interface";

export interface AppState {
  filters: { brands: string[] };
  shoes: ShoeWithStringDates[];
  filteredShoes: ShoeWithStringDates[] | [];
}

export const initialAppState: AppState = {
  filters: { brands: [] },
  shoes: [] as ShoeWithStringDates[],
  filteredShoes: [],
};
