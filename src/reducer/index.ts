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
      return {
        ...state,
        brands: action.payload,
      };
    case ActionType.AddBrandFilter:
      let tempArray = state.filters.brands;
      console.log(tempArray);
      const filterInArray = tempArray.includes(action.payload);

      if (filterInArray) {
        const positionInArray = tempArray.indexOf(action.payload);
        const itemRemoved = tempArray.splice(positionInArray, 1);
        console.log("remove: " + itemRemoved + " from array " + tempArray);
      } else {
        tempArray.push(action.payload);
        console.log("added: " + action.payload + " to array " + tempArray);
      }
      return {
        ...state,
        filters: { brands: tempArray },
      };
    default:
      return state;
  }
}
