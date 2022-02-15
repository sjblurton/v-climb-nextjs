import axios, { AxiosResponse } from "axios";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";

axios.defaults.baseURL = "http://localhost:3000";

export const getAllData = async () => {
  const shoes: AxiosResponse<{ shoes: ShoeWithStringDates }, any> =
    await axios.get("/api/v1/shoes/");
  const rubbers: AxiosResponse<{ rubbers: RubberWithStringDates }, any> =
    await axios.get("/api/v1/rubbers");
  const brands: AxiosResponse<{ brands: BrandWithStringDates }, any> =
    await axios.get("/api/v1/brands");

  return {
    brands: brands.data.brands,
    shoes: shoes.data.shoes,
    rubbers: rubbers.data.rubbers,
  };
};
