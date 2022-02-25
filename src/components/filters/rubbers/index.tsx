import React, { useContext, useEffect, useRef, useState } from "react";
import { FilterContext } from "../../../context/context";
import { Checkbox } from "../checkbox";

export const RubbersFilter = () => {
  const { state } = useContext(FilterContext);
  const rubberBrandName = useRef("");

  return (
    <>
      {state.filteredRubbers.map((rubber) => {
        rubberBrandName.current =
          state.brands.filter((brand) => rubber.brandId === brand.id)[0].name +
          " - ";
        return (
          <Checkbox
            filterGroup="rubber"
            key={rubber.id}
            id={rubber.id}
            label={`${rubberBrandName.current}${rubber.name}`}
          />
        );
      })}
    </>
  );
};
