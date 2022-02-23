import { BrandWithStringDates, ShoeWithStringDates } from "../interface";

export enum ActionType {
  InitShoeData,
  InitBrandData,
  AddBrandFilter,
}

export interface InitShoeData {
  type: ActionType.InitShoeData;
  payload: ShoeWithStringDates[];
}
export interface InitBrandData {
  type: ActionType.InitBrandData;
  payload: BrandWithStringDates[];
}

export interface AddBrandFilter {
  type: ActionType.AddBrandFilter;
  payload: string;
}

export type AppActions = InitShoeData | InitBrandData | AddBrandFilter;
