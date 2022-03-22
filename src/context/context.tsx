import { createContext, Dispatch, ReactNode, useReducer } from "react";
import {
  filterReducer,
  AppActions,
  AppState,
  initialAppState,
} from "../reducer";

export const FilterContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppActions>;
}>({
  state: initialAppState,
  dispatch: () => undefined,
});

type Props = { children: ReactNode };

export const ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(filterReducer, initialAppState);

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};
