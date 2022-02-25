import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";

export enum ActionType {
  InitShoeData,
  InitBrandData,
  InitRubberData,
  AddBrandFilter,
  AddRubberFilter,
}

export interface InitShoeData {
  type: ActionType.InitShoeData;
  payload: ShoeWithStringDates[];
}
export interface InitBrandData {
  type: ActionType.InitBrandData;
  payload: BrandWithStringDates[];
}

export interface InitRubberData {
  type: ActionType.InitRubberData;
  payload: RubberWithStringDates[];
}
export interface AddBrandFilter {
  type: ActionType.AddBrandFilter;
  payload: string;
}

export interface AddRubberFilter {
  type: ActionType.AddRubberFilter;
  payload: string;
}

export type AppActions =
  | InitShoeData
  | InitBrandData
  | AddBrandFilter
  | InitRubberData
  | AddRubberFilter;
