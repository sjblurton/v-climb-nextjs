import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FilterContext } from "../../context/context";
import { ActionType } from "../../reducer/actions";
import { axiosGet } from "../../service/axios";
import { Accordion } from "./accordion";
import { BrandsFilter } from "./brands";
import { MidsoleFilter } from "./midsole";
import { RubbersFilter } from "./rubbers";
import { VeganFilter } from "./vegan";

export const Filters = () => {
  const { state, dispatch } = useContext(FilterContext);
  const router = useRouter();

  const handleApplyClick = async () => {
    const brandString = state.filters.brands
      .map((brand) => "&brandId=" + brand)
      .join("");
    const rubberString = state.filters.rubbers
      .map((rubber) => "&rubberId=" + rubber)
      .join("");
    const midsoleString = state.filters.midsole
      .map((midsole) => "&midsole=" + midsole)
      .join("");
    const vegan = state.filters.midsole
      .map((vegan) => "&veganType=" + vegan)
      .join("");
    router.push(
      `?${brandString}${rubberString}${midsoleString}${vegan}`,
      undefined,
      {
        shallow: true,
      }
    );
    const shoes = await axiosGet.getShoes({
      brandId: state.filters.brands,
      rubberId: state.filters.rubbers,
      midsole: state.filters.midsole,
      veganType: state.filters.veganType,
    });
    if (shoes.shoes)
      dispatch({
        type: ActionType.SetFilteredShoes,
        payload: {
          filteredShoes: shoes.shoes,
        },
      });
  };

  const handleReset = () => {
    router.push(`/`);
    dispatch({ type: ActionType.ResetForm });
  };

  return (
    <Accordion
      title="Filters"
      content={
        <>
          <Accordion title="Brands" content={<BrandsFilter />} />
          <Accordion title="Rubber Brand" content={<RubbersFilter />} />
          <Accordion title="Midsole" content={<MidsoleFilter />} />
          <Accordion title="Vegan" content={<VeganFilter />} />
          <button
            className="btn btn-olive mt-4 w-full"
            onClick={handleApplyClick}
          >
            apply
          </button>
          <button className="btn btn-danger mt-4 w-full" onClick={handleReset}>
            reset
          </button>
        </>
      }
    />
  );
};
