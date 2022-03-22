import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";
import { AppState } from "./state";

const uniqueFilter = (arr: string[]) => {
  return arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
};

const getArrayOfUniqueFilters = (
  key: keyof ShoeWithStringDates,
  data: ShoeWithStringDates[]
): string[] => {
  if (key !== "ankle_protection" && data)
    return uniqueFilter(data.map((item) => item[key]));
  return [];
};

export const addRemoveItem = (arr: string[], item: string) => {
  const positionInArray = arr.indexOf(item);
  positionInArray > -1 ? arr.splice(positionInArray, 1) : arr.push(item);
  return arr;
};

export const filterShoes = (
  arr: ShoeWithStringDates[],
  filters: string[],
  key: keyof ShoeWithStringDates
): ShoeWithStringDates[] => {
  let newArr: ShoeWithStringDates[] = [];
  for (let i = 0; i < filters.length; i++) {
    const tempArr = arr.filter((item) => item[key] === filters[i]);
    newArr = [...newArr, ...tempArr];
  }
  return newArr;
};

export const filteredList = (
  shoes: ShoeWithStringDates[],
  key: keyof ShoeWithStringDates,
  listToFilter: BrandWithStringDates[] | RubberWithStringDates[]
): BrandWithStringDates[] | RubberWithStringDates[] => {
  const uniqueBrands = getArrayOfUniqueFilters(key, shoes);
  return listToFilter
    .filter((item) => uniqueBrands.includes(item.id))
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
};

export const resetFilters = (state: AppState): AppState => {
  const listOfBrandsToFilter = filteredList(
    state.shoes,
    "brandId",
    state.brands
  ) as BrandWithStringDates[];

  const listOfRubbersToFilter = filteredList(
    state.shoes,
    "rubberId",
    state.rubbers
  ) as RubberWithStringDates[];

  return {
    ...state,
    filteredShoes: state.shoes,
    filters: {
      brands: [],
      rubbers: [],
      midsole: [],
      asymmetry: [],
      closure: [],
      hooking: [],
      price: [],
      profile: [],
      rubber_thickness: [],
      veganType: [],
      volume: [],
      rubber_stiffness: [],
    },
    filteredBrands: listOfBrandsToFilter,
    filteredRubbers: listOfRubbersToFilter,
  };
};
