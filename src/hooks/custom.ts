import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import useSWR from "swr";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";

export const fetcher = (url: string, params?: ParsedUrlQuery) =>
  axios.get(url, params).then((res) => res.data);

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

export const useShoeQuery = (query: ParsedUrlQuery) => {
  const { data, error, mutate } = useSWR<{ shoes: ShoeWithStringDates[] }, any>(
    { url: "/api/v1/shoes/", params: { query } },
    fetcher
  );
  return {
    shoesQueryData: data,
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
