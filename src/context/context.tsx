import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { filterReducer } from "../reducer";
import { AppActions } from "../reducer/actions";
import { AppState, initialAppState } from "../reducer/state";

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
