import { ShoeWithStringDates } from "../interface";

export enum ActionType {
  InitShoeData,
}

export interface InitShoeData {
  type: ActionType.InitShoeData;
  payload: ShoeWithStringDates[];
}

export type AppActions = InitShoeData;
