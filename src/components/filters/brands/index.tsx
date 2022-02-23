import React, { useContext } from "react";
import { FilterContext } from "../../../context/context";
import { Checkbox } from "../checkbox";

export const BrandsFilter = () => {
  const { state, dispatch } = useContext(FilterContext);
  return (
    <>
      {state.brands.map((brand) => (
        <Checkbox key={brand.id} id={brand.id} label={brand.name} />
      ))}
    </>
  );
};
