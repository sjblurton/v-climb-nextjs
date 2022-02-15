import axios from "axios";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";

export const getAllData = async () => {
  try {
    const shoes: ShoeWithStringDates[] = await axios.get("/api/v1/shoes/");
    const rubbers: RubberWithStringDates[] = await axios.get("/api/v1/rubbers");
    const brands: BrandWithStringDates[] = await axios.get("/api/v1/brands");

    return { shoes };
  } catch (error) {
    console.log(error);
  }
};

export const getAllShoes = async () => {
  try {
    const shoes: ShoeWithStringDates[] = await axios.get("/api/v1/shoes");
    return shoes;
  } catch (error) {
    console.log(error);
  }
};
