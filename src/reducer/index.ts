import { ActionType, AppActions } from "./actions";
import { AppState } from "./state";

export function filterReducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case ActionType.InitShoeData:
      console.log(state, action);
      return {
        ...state,
        filteredShoes: action.payload,
        shoes: action.payload,
      };
    default:
      return state;
  }
}
