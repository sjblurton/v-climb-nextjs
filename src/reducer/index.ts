import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";
import { ActionType, AppActions } from "./actions";
import { AppState } from "./state";

export function filterReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionType.InitShoeData: {
      return {
        ...state,
        filteredShoes: action.payload,
        shoes: action.payload,
      };
    }
    case ActionType.InitBrandData: {
      const listOfBrandsToFilter = filteredList(
        state.filteredShoes,
        "brandId",
        action.payload
      ) as BrandWithStringDates[];
      return {
        ...state,
        brands: action.payload,
        filteredBrands: listOfBrandsToFilter,
      };
    }

    case ActionType.InitRubberData: {
      const listOfRubbersToFilter = filteredList(
        state.filteredShoes,
        "rubberId",
        action.payload
      ) as RubberWithStringDates[];
      return {
        ...state,
        rubbers: action.payload,
        filteredRubbers: listOfRubbersToFilter,
      };
    }

    case ActionType.AddBrandFilter: {
      const filterByBrandArray = addRemoveItem(
        state.filters.brands,
        action.payload
      );

      if (filterByBrandArray.length === 0) return resetFilters(state);

      const newBrandFilteredArray =
        (filterByBrandArray.length > 0 &&
          filterShoes(state.shoes, filterByBrandArray, "brandId")) ||
        [];

      state.filteredRubbers = filteredList(
        newBrandFilteredArray,
        "rubberId",
        state.rubbers
      ) as RubberWithStringDates[];

      state.filters.brands = filterByBrandArray;

      return {
        ...state,
      };
    }

    case ActionType.AddRubberFilter: {
      const filterByRubberArray = addRemoveItem(
        state.filters.rubbers,
        action.payload
      );

      if (filterByRubberArray.length === 0) return resetFilters(state);

      const newRubberFilteredArray =
        (filterByRubberArray.length > 0 &&
          filterShoes(state.shoes, filterByRubberArray, "rubberId")) ||
        [];

      state.filteredBrands = filteredList(
        newRubberFilteredArray,
        "brandId",
        state.brands
      ) as BrandWithStringDates[];

      state.filters.rubbers = filterByRubberArray;

      return {
        ...state,
      };
    }
    case ActionType.AddMidsoleFilter: {
      const filterByMidsoleArray = addRemoveItem(
        state.filters.midsole,
        action.payload
      );

      state.filters.midsole = filterByMidsoleArray;

      return {
        ...state,
      };
    }
    case ActionType.ResetForm: {
      return resetFilters(state);
    }
    case ActionType.SetFilteredShoes: {
      return { ...state, filteredShoes: action.payload.filteredShoes };
    }

    case ActionType.AddVeganFilter: {
      const filterByVeganArray = addRemoveItem(
        state.filters.veganType,
        action.payload
      );
      state.filters.veganType = filterByVeganArray;

      return { ...state };
    }

    case ActionType.AddRubberStiffnessFilter: {
      const filterByRubberStiffnessArray = addRemoveItem(
        state.filters.rubber_stiffness,
        action.payload
      );
      state.filters.rubber_stiffness = filterByRubberStiffnessArray;

      for (let i = 0; i < filterByRubberStiffnessArray.length; i++) {
        const element = filterByRubberStiffnessArray[i];
        const list = state.filteredRubbers
          .filter((rubber) => rubber.stiffness === element)
          .map((item) => item.id);
        state.filters.rubbers.push(...list);
      }

      const newRubberFilteredArray =
        (state.filters.rubbers.length > 0 &&
          filterShoes(state.shoes, state.filters.rubbers, "rubberId")) ||
        [];

      state.filteredBrands = filteredList(
        newRubberFilteredArray,
        "brandId",
        state.brands
      ) as BrandWithStringDates[];

      return { ...state };
    }

    case ActionType.SetIsLoading: {
      state.isLoading = action.payload;

      return { ...state };
    }

    case ActionType.AddAsymmetryFilter: {
      const filterByAsymmetryArray = addRemoveItem(
        state.filters.asymmetry,
        action.payload
      );
      state.filters.asymmetry = filterByAsymmetryArray;

      return { ...state };
    }
    case ActionType.AddClosureFilter: {
      const filterByClosureArray = addRemoveItem(
        state.filters.closure,
        action.payload
      );
      state.filters.closure = filterByClosureArray;

      return { ...state };
    }
    case ActionType.AddHookingFilter: {
      const filterByHookingArray = addRemoveItem(
        state.filters.hooking,
        action.payload
      );
      state.filters.hooking = filterByHookingArray;

      return { ...state };
    }
    case ActionType.AddPriceFilter: {
      const filterByPriceArray = addRemoveItem(
        state.filters.price,
        action.payload
      );
      state.filters.price = filterByPriceArray;

      return { ...state };
    }
    case ActionType.AddProfileFilter: {
      const filterByProfileArray = addRemoveItem(
        state.filters.profile,
        action.payload
      );
      state.filters.profile = filterByProfileArray;

      return { ...state };
    }
    case ActionType.AddRubberThicknessFilter: {
      const filterByRubberThicknessArray = addRemoveItem(
        state.filters.rubber_thickness,
        action.payload
      );
      state.filters.rubber_thickness = filterByRubberThicknessArray;

      return { ...state };
    }
    case ActionType.AddVolumeFilter: {
      const filterByVolumeArray = addRemoveItem(
        state.filters.volume,
        action.payload
      );
      state.filters.volume = filterByVolumeArray;

      return { ...state };
    }

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

const getArrayOfUniqueFilters = (
  key: keyof ShoeWithStringDates,
  data: ShoeWithStringDates[]
): string[] => {
  if (key !== "ankle_protection" && data)
    return uniqueFilter(data.map((item) => item[key]));
  return [];
};

const uniqueFilter = (arr: string[]) => {
  return arr.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
};

const filteredList = (
  shoes: ShoeWithStringDates[],
  key: keyof ShoeWithStringDates,
  listToFilter: BrandWithStringDates[] | RubberWithStringDates[]
): BrandWithStringDates[] | RubberWithStringDates[] => {
  const uniqueBrands = getArrayOfUniqueFilters(key, shoes);
  return listToFilter.filter((item) => uniqueBrands.includes(item.id));
};

const resetFilters = (state: AppState): AppState => {
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
