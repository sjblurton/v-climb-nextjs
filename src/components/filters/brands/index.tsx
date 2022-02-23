import React, { useContext } from "react";
import { FilterContext } from "../../../context/context";

type Props = {};

export const BrandsFilter = (props: Props) => {
  const { state, dispatch } = useContext(FilterContext);
  console.log(state);
  return <></>;
};
