import axios, { AxiosResponse } from "axios";
import { slugString } from "../helper/stringify";
import {
  BrandPost,
  BrandWithStringDates,
  RubberPost,
  RubberWithStringDates,
  ShoePost,
  ShoePostInput,
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

export const axiosGet = {
  getShoes: async () => {
    const response: AxiosResponse<{ shoes: ShoeWithStringDates[] }, any> =
      await axios.get("/api/v1/shoes/");
    if ("data" in response) {
      return { shoes: response.data.shoes };
    } else {
      return { error: { shoes: "shoes failed to load" } };
    }
  },
  getRubber: async () => {
    const response: AxiosResponse<{ rubbers: RubberWithStringDates[] }, any> =
      await axios.get("/api/v1/rubbers");
    if ("data" in response) {
      return { rubbers: response.data.rubbers };
    } else {
      return { error: { rubbers: "rubbers failed to load" } };
    }
  },
  getBrands: async () => {
    const response: AxiosResponse<{ brands: BrandWithStringDates[] }, any> =
      await axios.get("/api/v1/brands");
    if ("data" in response) {
      return { brands: response.data.brands };
    } else {
      return { error: { brands: "brands failed to load" } };
    }
  },
  getShoeBySlug: async (slug: string) => {
    const response: AxiosResponse<{ shoes: ShoeWithStringDates[] }, any> =
      await axios.get(`/api/v1/shoes/${slug}`);
    if ("data" in response) {
      return { shoe: response.data.shoes[0] };
    } else {
      return { error: { shoe: `shoe ${slug} failed to load` } };
    }
  },
  getBrandById: async (id: string) => {
    const response: AxiosResponse<{ brands: BrandWithStringDates[] }, any> =
      await axios.get(`/api/v1/brands/${id}`);
    if ("data" in response) {
      return { brandName: response.data.brands[0].name };
    } else {
      return { error: { brand: `brand ${id} failed to load` } };
    }
  },
  getRubberById: async (id: string) => {
    const response: AxiosResponse<{ rubbers: RubberWithStringDates[] }, any> =
      await axios.get(`/api/v1/rubbers/${id}`);
    if ("data" in response) {
      return { rubber: response.data.rubbers[0] };
    } else {
      return { error: { rubber: `rubber ${id} failed to load` } };
    }
  },
};

export const axiosPost = {
  postShoes: async (data: ShoePostInput) => {
    const brand = await axiosGet.getBrandById(data.brandId);

    if (brand.brandName) {
      const slug = slugString(brand.brandName, data.name);
      const ankleStringToBoolean =
        data["ankle protection"] === "YES" ? true : false || false;
      const rubber_thickness = data["rubber thickness"] || "THINNER";
      delete data["ankle protection"];
      delete data["rubber thickness"];
      const shoeWithSlug: ShoePost = {
        ...data,
        slug: slug,
        ankle_protection: ankleStringToBoolean,
        rubber_thickness: rubber_thickness,
      };
      const response: AxiosResponse<{ shoes: ShoeWithStringDates[] }, any> =
        await axios.post("/api/v1/shoes/", shoeWithSlug);
      if ("data" in response) {
        return { shoes: response.data.shoes[0] };
      } else {
        return {
          error: {
            shoes: `Shoes ${data.name} did not add to database. please try again.`,
          },
        };
      }
    } else
      return {
        error: {
          shoes: `Shoes ${data.name} did not add to database. please try again.`,
        },
      };
  },
  postRubber: async (data: RubberPost) => {
    const response: AxiosResponse<{ rubbers: RubberWithStringDates[] }, any> =
      await axios.post("/api/v1/rubbers/", data);
    if ("data" in response) {
      return { rubbers: response.data.rubbers[0] };
    } else {
      return {
        error: {
          rubbers: `Rubber ${data.name} did not add to database. please try again.`,
        },
      };
    }
  },
  postBrand: async (data: BrandPost) => {
    const response: AxiosResponse<{ brands: BrandWithStringDates[] }, any> =
      await axios.post("/api/v1/brands/", data);
    if ("data" in response) {
      return { brands: response.data.brands[0] };
    } else {
      return {
        error: {
          brands: `Brand ${data.name} did not add to database. please try again.`,
        },
      };
    }
  },
};

export const axiosDelete = {
  deleteBrand: async (id: string) => {
    const response: AxiosResponse<{ brands: BrandWithStringDates[] }, any> =
      await axios.delete(`/api/v1/brands/${id}`);
    if ("data" in response) {
      return { brandName: response.data.brands[0].name };
    } else {
      return { error: { brand: `brand id: ${id} failed delete` } };
    }
  },
  deleteRubber: async (id: string) => {
    const response: AxiosResponse<{ rubbers: RubberWithStringDates[] }, any> =
      await axios.delete(`/api/v1/rubbers/${id}`);
    if ("data" in response) {
      return { rubber: response.data.rubbers[0].name };
    } else {
      return { error: { rubber: `rubber id: ${id} failed delete` } };
    }
  },
  deleteShoe: async (slug: string) => {
    const response: AxiosResponse<{ shoes: ShoeWithStringDates[] }, any> =
      await axios.delete(`/api/v1/shoes/${slug}`);
    if ("data" in response) {
      return { shoes: response.data.shoes[0].name };
    } else {
      return { error: { shoes: `shoes slug: ${slug} failed delete` } };
    }
  },
};
