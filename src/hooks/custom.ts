import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { useContext, useEffect } from "react";
import useSWR from "swr";
import { FilterContext } from "../context/context";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";
import { ActionType } from "../reducer";

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

type Args = {
  shoes?: ShoeWithStringDates[];
  brands?: BrandWithStringDates[];
  rubbers?: RubberWithStringDates[];
};

export const useInitState = (args: Args) => {
  const { state, dispatch } = useContext(FilterContext);
  const { data: shoes } = useSWR<{ shoes: ShoeWithStringDates[] }, any>(
    `/api/v1/shoes`,
    fetcher
  );
  const { data: rubber } = useSWR<{ rubbers: RubberWithStringDates[] }, any>(
    `/api/v1/rubbers`,
    fetcher
  );
  const { data: brands } = useSWR<{ brands: BrandWithStringDates[] }, any>(
    `/api/v1/brands`,
    fetcher
  );

  useEffect(() => {
    if (args.shoes && state.shoes.length === 0) {
      dispatch({ type: ActionType.InitShoeData, payload: args.shoes });
    }
    if (shoes && state.shoes.length === 0)
      dispatch({ type: ActionType.InitShoeData, payload: shoes?.shoes });
  }, [shoes]); // eslint-disable-line

  useEffect(() => {
    if (args.rubbers && state.rubbers.length === 0) {
      dispatch({ type: ActionType.InitRubberData, payload: args.rubbers });
    }
    if (rubber && state.rubbers.length === 0)
      dispatch({ type: ActionType.InitRubberData, payload: rubber?.rubbers });
  }, [rubber]); // eslint-disable-line

  useEffect(() => {
    if (args.brands && state.brands.length === 0)
      dispatch({ type: ActionType.InitBrandData, payload: args.brands });
    if (brands && state.brands.length === 0)
      dispatch({ type: ActionType.InitBrandData, payload: brands?.brands });
  }, [brands]); // eslint-disable-line

  useEffect(() => {
    if (brands && rubber && shoes) dispatch({ type: ActionType.ResetForm });
  }, [brands, rubber, shoes]); // eslint-disable-line
};
