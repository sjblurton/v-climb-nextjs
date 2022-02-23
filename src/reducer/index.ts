import { ShoeWithStringDates } from "../interface";
import { ActionType, AppActions } from "./actions";
import { AppState } from "./state";

export function filterReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionType.InitShoeData:
      return {
        ...state,
        filteredShoes: action.payload,
        shoes: action.payload,
      };
    case ActionType.InitBrandData:
      const brandInitArray = state.shoes.map((item) => item.brandId);
      const uniqueBrands = uniqueFilter(brandInitArray);
      const listOfBrandsToFilter = action.payload.filter((item) =>
        uniqueBrands.includes(item.id)
      );
      return {
        ...state,
        brands: listOfBrandsToFilter,
      };
    case ActionType.AddBrandFilter:
      const filterByBrandArray = addRemoveItem(
        state.filters.brands,
        action.payload
      );
      const newBrandFilteredArray =
        filterByBrandArray.length === 0
          ? state.shoes
          : filterShoes(state.shoes, filterByBrandArray, "brandId");

      return {
        ...state,
        filteredShoes: newBrandFilteredArray,
        filters: { brands: filterByBrandArray },
      };
    default:
      return state;
  }
}

const addRemoveItem = (arr: string[], item: string) => {
  const positionInArray = arr.indexOf(item);
  positionInArray > -1 ? arr.splice(positionInArray, 1) : arr.push(item);
  return arr;
};

const filterShoes = (
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

const uniqueFilter = (arr: string[]) => {
  return arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
};
