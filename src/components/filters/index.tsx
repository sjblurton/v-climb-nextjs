import React from "react";
import { Accordion } from "./accordion";
import { BrandsFilter } from "./brands";

type Props = {};

export const Filters = (props: Props) => {
  return (
    <Accordion
      title="Filters"
      content={<Accordion title="Brands" content={<BrandsFilter />} />}
    />
  );
};
