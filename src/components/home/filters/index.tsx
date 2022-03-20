import {
  AsymmetryType,
  ClosureType,
  HookingType,
  PriceType,
  ProfileType,
  RubberThicknessType,
  StiffnessType,
  VolumeType,
} from "@prisma/client";
import React, { useContext } from "react";
import { FilterContext } from "../../../context/context";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../../../interface";
import { ActionType } from "../../../reducer/actions";
import { axiosGet } from "../../../service/axios";
import { Accordion } from "./accordion";
import { BrandsFilter } from "./brands";
import { Filter } from "./filter";
import { RubbersFilter } from "./rubbers";
import { VeganFilter } from "./vegan";

type Props = {
  shoes: ShoeWithStringDates[];
  brands: BrandWithStringDates[];
  rubbers: RubberWithStringDates[];
};

export const Filters = ({ brands, rubbers, shoes }: Props) => {
  const { state, dispatch } = useContext(FilterContext);

  const handleApplyClick = async () => {
    dispatch({ type: ActionType.SetIsLoading, payload: true });
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
    dispatch({ type: ActionType.ResetForm });
  };

  return (
    <Accordion
      title="Filters"
      content={
        <>
          <Accordion
            title="Brands"
            content={<BrandsFilter brands={brands} />}
          />
          <Accordion
            title="Rubber Brand"
            content={<RubbersFilter rubbers={rubbers} brands={brands} />}
          />
          <Accordion
            title="Rubber Stiffness"
            content={Filter("rubberStiffness", Object.keys(StiffnessType))}
          />
          <Accordion
            title="Midsole"
            content={Filter("midsole", Object.keys(StiffnessType))}
          />
          <Accordion title="Vegan" content={<VeganFilter />} />
          <Accordion
            title="Asymmetry"
            content={Filter("asymmetry", Object.keys(AsymmetryType))}
          />
          <Accordion
            title="Closure"
            content={Filter("closure", Object.keys(ClosureType))}
          />
          <Accordion
            title="Hooking"
            content={Filter("hooking", Object.keys(HookingType))}
          />
          <Accordion
            title="Price"
            content={Filter("price", Object.keys(PriceType))}
          />
          <Accordion
            title="Profile"
            content={Filter("profile", Object.keys(ProfileType))}
          />
          <Accordion
            title="Rubber Thickness"
            content={Filter(
              "rubberThickness",
              Object.keys(RubberThicknessType)
            )}
          />
          <Accordion
            title="Volume"
            content={Filter("volume", Object.keys(VolumeType))}
          />

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
