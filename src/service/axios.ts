import axios, { AxiosResponse } from "axios";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";

axios.defaults.baseURL = "http://localhost:3000";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

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

const axiosGet = {
  getShoes: async () => {
    try {
      const response: AxiosResponse<{ shoes: ShoeWithStringDates }, any> =
        await axios.get("/api/v1/shoes/");
      return { shoes: response.data.shoes };
    } catch (error: any) {
      console.log(error.response); // this is the main part. Use the response property from the error object
      return error.response;
    }
  },
};
