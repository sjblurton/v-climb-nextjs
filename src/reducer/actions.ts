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
  AddMidsoleFilter,
  ResetForm,
  SetFilteredShoes,
  AddVeganFilter,
  AddRubberStiffnessFilter,
  SetIsLoading,
  AddAsymmetryFilter,
  AddClosureFilter,
  AddHookingFilter,
  AddPriceFilter,
  AddProfileFilter,
  AddRubberThicknessFilter,
  AddVolumeFilter,
  AddMoreShoes,
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

export interface AddMidsoleFilter {
  type: ActionType.AddMidsoleFilter;
  payload: string;
}

export interface ResetForm {
  type: ActionType.ResetForm;
}

export interface SetFilteredShoes {
  type: ActionType.SetFilteredShoes;
  payload: { filteredShoes: ShoeWithStringDates[] };
}

export interface AddVeganFilter {
  type: ActionType.AddVeganFilter;
  payload: string;
}

export interface AddRubberStiffnessFilter {
  type: ActionType.AddRubberStiffnessFilter;
  payload: string;
}

export interface SetIsLoading {
  type: ActionType.SetIsLoading;
  payload: boolean;
}

export interface AddAsymmetryFilter {
  type: ActionType.AddAsymmetryFilter;
  payload: string;
}
export interface AddClosureFilter {
  type: ActionType.AddClosureFilter;
  payload: string;
}
export interface AddHookingFilter {
  type: ActionType.AddHookingFilter;
  payload: string;
}
export interface AddPriceFilter {
  type: ActionType.AddPriceFilter;
  payload: string;
}
export interface AddProfileFilter {
  type: ActionType.AddProfileFilter;
  payload: string;
}
export interface AddRubberThicknessFilter {
  type: ActionType.AddRubberThicknessFilter;
  payload: string;
}
export interface AddVolumeFilter {
  type: ActionType.AddVolumeFilter;
  payload: string;
}

export interface AddMoreShoes {
  type: ActionType.AddMoreShoes;
  payload: { shoes: ShoeWithStringDates[]; limit: number; skip: number };
}

export type AppActions =
  | InitShoeData
  | InitBrandData
  | AddBrandFilter
  | InitRubberData
  | AddRubberFilter
  | AddMidsoleFilter
  | ResetForm
  | SetFilteredShoes
  | AddVeganFilter
  | AddRubberStiffnessFilter
  | SetIsLoading
  | AddAsymmetryFilter
  | AddClosureFilter
  | AddHookingFilter
  | AddPriceFilter
  | AddProfileFilter
  | AddRubberThicknessFilter
  | AddVolumeFilter
  | AddMoreShoes;
