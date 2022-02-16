import axios, { AxiosResponse } from "axios";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";

axios.defaults.baseURL = "http://localhost:3000";

export const getAllData = async () => {
  const shoesRes = await axiosGet.getShoes();
  const RubbersRes = await axiosGet.getRubber();
  const brandsRes = await axiosGet.getBrands();

  return {
    ...shoesRes,
    ...RubbersRes,
    ...brandsRes,
  };
};

const axiosGet = {
  getShoes: async () => {
    const response: AxiosResponse<{ shoes: ShoeWithStringDates }, any> =
      await axios.get("/api/v1/shoes/");
    if ("data" in response) {
      return { shoes: response.data.shoes };
    } else {
      return { error: { shoes: "shoes failed to load" } };
    }
  },
  getRubber: async () => {
    const response: AxiosResponse<{ rubbers: RubberWithStringDates }, any> =
      await axios.get("/api/v1/rubbers");
    if ("data" in response) {
      return { rubbers: response.data.rubbers };
    } else {
      return { error: { rubbers: "rubbers failed to load" } };
    }
  },
  getBrands: async () => {
    const response: AxiosResponse<{ brands: BrandWithStringDates }, any> =
      await axios.get("/api/v1/brands");
    if ("data" in response) {
      return { brands: response.data.brands };
    } else {
      return { error: { brands: "brands failed to load" } };
    }
  },
};
