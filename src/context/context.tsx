import { createContext, ReactNode } from "react";
import { useBrands, useRubbers, useShoes } from "../hooks/custom";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";

interface DataContext {
  shoes: {
    data: ShoeWithStringDates[] | undefined;
    isLoading: boolean;
    isError: any;
  };
  rubbers: {
    data: RubberWithStringDates[] | undefined;
    isLoading: boolean;
    isError: any;
  };
  brands: {
    data: BrandWithStringDates[] | undefined;
    isLoading: boolean;
    isError: any;
  };
}

const initialState = {
  shoes: { data: undefined, isLoading: true, isError: undefined },
  rubbers: { data: undefined, isLoading: true, isError: undefined },
  brands: { data: undefined, isLoading: true, isError: undefined },
};

export const DataContext = createContext<DataContext>(initialState);

interface Props {
  children: ReactNode;
}

export function ContentProvider({ children }: Props) {
  const shoesRes = useShoes();
  const rubberRes = useRubbers();
  const brandsRes = useBrands();
  const data = {
    shoes: shoesRes,
    rubbers: rubberRes,
    brands: brandsRes,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
