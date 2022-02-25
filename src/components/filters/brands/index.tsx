import React, { useContext } from "react";
import { FilterContext } from "../../../context/context";
import { Checkbox } from "../checkbox";

export const BrandsFilter = () => {
  const { state } = useContext(FilterContext);
  return (
    <>
      {state.filteredBrands.map((brand) => (
        <Checkbox
          filterGroup="brand"
          key={brand.id}
          id={brand.id}
          label={brand.name}
        />
      ))}
    </>
  );
};
