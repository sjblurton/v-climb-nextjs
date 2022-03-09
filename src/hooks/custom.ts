import axios from "axios";
import useSWR from "swr";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useShoes = (id = "") => {
  const { data, error, mutate } = useSWR<{ shoes: ShoeWithStringDates[] }, any>(
    `/api/v1/shoes/${id}`,
    fetcher
  );
  return {
    shoesData: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useRubbers = (id = "") => {
  const { data, error, mutate } = useSWR<
    { rubbers: RubberWithStringDates[] },
    any
  >(`/api/v1/rubbers/${id}`, fetcher);
  return {
    rubbersData: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useBrands = (id = "") => {
  const { data, error, mutate } = useSWR<
    { brands: BrandWithStringDates[] },
    any
  >(`/api/v1/brands/${id}`, fetcher);
  return {
    brandsData: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
