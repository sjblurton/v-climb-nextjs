import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FilterContext } from "../../../context/context";
import { queryString } from "../../../helper/stringify";
import { ActionType } from "../../../reducer/actions";
import { axiosGet } from "../../../service/axios";
import { Accordion } from "./accordion";
import { AsymmetryFilter } from "./asymmetry";
import { BrandsFilter } from "./brands";
import { ClosureFilter } from "./closure";
import { HookingFilter } from "./hooking";
import { MidsoleFilter } from "./midsole";
import { PriceFilter } from "./price";
import { ProfileFilter } from "./profile";
import { RubbersFilter } from "./rubbers";
import { RubberStiffnessFilter } from "./rubberStiffness";
import { RubberThicknessFilter } from "./rubberThickness";
import { VeganFilter } from "./vegan";
import { VolumeFilter } from "./volume";

export const Filters = () => {
  const { state, dispatch } = useContext(FilterContext);
  const router = useRouter();

  const handleApplyClick = async () => {
    dispatch({ type: ActionType.SetIsLoading, payload: true });
    const queryURLString = [
      "?",
      queryString("brandId", state.filters.brands),
      queryString("rubberId", state.filters.rubbers),
      queryString("midsole", state.filters.midsole),
      queryString("veganType", state.filters.veganType),
      queryString("asymmetry", state.filters.asymmetry),
      queryString("closure", state.filters.closure),
      queryString("hooking", state.filters.hooking),
      queryString("price", state.filters.price),
      queryString("profile", state.filters.profile),
      queryString("profile", state.filters.profile),
      queryString("volume", state.filters.volume),
      queryString("rubber_thickness", state.filters.rubber_thickness),
    ].join("");
    router.push(queryURLString, undefined, {
      shallow: true,
    });
    const shoes = await axiosGet.getShoes({
      brandId: state.filters.brands,
      rubberId: state.filters.rubbers,
      midsole: state.filters.midsole,
      veganType: state.filters.veganType,
      asymmetry: state.filters.asymmetry,
      closure: state.filters.closure,
      hooking: state.filters.hooking,
      price: state.filters.price,
      profile: state.filters.profile,
      volume: state.filters.volume,
      rubber_thickness: state.filters.rubber_thickness,
    });
    if (shoes.shoes)
      dispatch({
        type: ActionType.SetFilteredShoes,
        payload: {
          filteredShoes: shoes.shoes,
        },
      });
    dispatch({ type: ActionType.SetIsLoading, payload: false });
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
          {/* <Accordion title="Rubber Brand" content={<RubbersFilter />} /> */}
          {/* <Accordion
          title="Rubber Stiffness"
          content={<RubberStiffnessFilter />}
        /> */}
          <Accordion title="Midsole" content={<MidsoleFilter />} />
          <Accordion title="Vegan" content={<VeganFilter />} />
          <Accordion title="Asymmetry" content={<AsymmetryFilter />} />
          <Accordion title="Closure" content={<ClosureFilter />} />
          <Accordion title="Hooking" content={<HookingFilter />} />
          <Accordion title="Price" content={<PriceFilter />} />
          <Accordion title="Profile" content={<ProfileFilter />} />
          <Accordion
            title="Rubber Thickness"
            content={<RubberThicknessFilter />}
          />
          <Accordion title="Volume" content={<VolumeFilter />} />

          <button
            disabled={state.isLoading}
            className={
              state.isLoading
                ? "btn btn-olive mt-4 w-full disabled-btn"
                : "btn btn-olive mt-4 w-full"
            }
            onClick={handleApplyClick}
          >
            apply
          </button>
          <button
            disabled={state.isLoading}
            className={
              state.isLoading
                ? "btn btn-danger mt-4 w-full disabled-btn"
                : "btn btn-danger mt-4 w-full"
            }
            onClick={handleReset}
          >
            reset
          </button>
        </>
      }
    />
  );
};
