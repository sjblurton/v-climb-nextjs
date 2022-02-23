import React, { useContext } from "react";
import { FilterContext } from "../../../context/context";
import { Checkbox } from "../checkbox";

type Props = {};

export const BrandsFilter = (props: Props) => {
  const { state, dispatch } = useContext(FilterContext);
  return (
    <>
      {state.brands.map((brand) => (
        <Checkbox type="brand" key={brand.id} label={brand.name} />
      ))}
    </>
  );
};
