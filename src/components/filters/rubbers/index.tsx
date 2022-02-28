import React, { useContext } from "react";
import { FilterContext } from "../../../context/context";
import { Checkbox } from "../checkbox";

export const RubbersFilter = () => {
  const { state } = useContext(FilterContext);

  return (
    <>
      {state.filteredRubbers.map((rubber) => {
        const title =
          state.brands.filter((brand) => rubber.brandId === brand.id)[0].name +
          " - " +
          rubber.name;

        return (
          <Checkbox
            key={rubber.id}
            filterGroup="rubber"
            id={rubber.id}
            label={title}
          />
        );
      })}
    </>
  );
};
