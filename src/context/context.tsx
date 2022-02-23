import {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useReducer,
} from "react";
import { useBrands, useShoes } from "../hooks/custom";
import { filterReducer } from "../reducer";
import { ActionType, AppActions } from "../reducer/actions";
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
  const { shoesData } = useShoes();
  const { brandsData } = useBrands();
  const [state, dispatch] = useReducer(filterReducer, initialAppState);

  useEffect(() => {
    if (shoesData && brandsData) {
      dispatch({ type: ActionType.InitShoeData, payload: shoesData.shoes });
      dispatch({ type: ActionType.InitBrandData, payload: brandsData.brands });
    }
  }, [shoesData, brandsData]);

  if (shoesData)
    return (
      <FilterContext.Provider value={{ state, dispatch }}>
        {children}
      </FilterContext.Provider>
    );
  else return <></>;
};
