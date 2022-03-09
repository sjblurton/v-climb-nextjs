import React, { useContext, useEffect } from "react";
import useSWR from "swr";
import { FilterContext } from "../../../context/context";
import { brandNameFromId } from "../../../helper/stringify";
import { fetcher } from "../../../hooks/custom";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../../../interface";
import { ActionType } from "../../../reducer/actions";
import { Card, Message } from "../../shared";

export const ShoeGrid = () => {
  const { state, dispatch } = useContext(FilterContext);
  const { data: shoesData, error: shoesError } = useSWR<
    { shoes: ShoeWithStringDates[] },
    any
  >("/api/v1/shoes", fetcher);
  const { data: brandsData, error: brandsError } = useSWR<
    { brands: BrandWithStringDates[] },
    any
  >("/api/v1/brands", fetcher);
  const { data: rubbersData, error: rubberError } = useSWR<
    { rubbers: RubberWithStringDates[] },
    any
  >("/api/v1/rubbers", fetcher);

  useEffect(() => {
    shoesData &&
      dispatch({ type: ActionType.InitShoeData, payload: shoesData.shoes });

    shoesData &&
      brandsData &&
      dispatch({ type: ActionType.InitBrandData, payload: brandsData.brands });
    rubbersData &&
      dispatch({
        type: ActionType.InitRubberData,
        payload: rubbersData.rubbers,
      });
  }, [shoesData, brandsData]); // eslint-disable-line

  const card = (
    shoes: ShoeWithStringDates[],
    brands: BrandWithStringDates[]
  ) => {
    return shoes.map((item) => {
      return (
        <Card
          key={item.slug}
          shoe={item}
          brand={brandNameFromId(brands, item.brandId)}
        />
      );
    });
  };

  if (shoesData && brandsData)
    return (
      <div className="sm:col-span-8 md:col-span-9 gap-4 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lx:grid-cols-4 my-4">
        {card(state.filteredShoes, state.brands)}
      </div>
    );
  if ((!shoesError || !brandsError) && state.filteredShoes.length === 0)
    return (
      <div className="w-full h-full flex justify-center items-center mt-4 sm:col-span-8 md:col-span-9 lg:col-span-10">
        <Message>Sorry not shoes found, please try again...</Message>
      </div>
    );
  return (
    <div className="w-full h-full flex justify-center items-center mt-4 sm:col-span-8 md:col-span-9 lg:col-span-10">
      <Message>Sorry there a sever error, please try again...</Message>
      {console.log(shoesError, rubberError, brandsError)}
    </div>
  );
};
