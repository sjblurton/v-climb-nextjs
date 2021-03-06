import React, { useContext } from "react";
import { FilterContext } from "../../../context/context";
import { brandNameFromId } from "../../../helper/stringify";
import { BrandWithStringDates, ShoeWithStringDates } from "../../../interface";
import { Card } from "../../shared";
import { LoadMore } from "../more";

type Props = {
  shoes: ShoeWithStringDates[];
  brands: BrandWithStringDates[];
};

export const ShoeGrid = ({ shoes, brands }: Props) => {
  const { state } = useContext(FilterContext);
  const card = (
    shoes: ShoeWithStringDates[],
    brands: BrandWithStringDates[]
  ) => {
    return shoes.map((item) => {
      return (
        <Card
          key={item.slug}
          shoe={item}
          brand={brandNameFromId(brands, item.brandId)}
        />
      );
    });
  };

  if (state.shoes.length > 0) {
    return (
      <>
        <div className="sm:col-span-8 md:col-span-9 gap-4 lg:col-span-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-4">
          {card(state.filteredShoes, state.brands)}
          <LoadMore />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="sm:col-span-8 md:col-span-9 gap-4 lg:col-span-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3my-4">
        {card(shoes, brands)}
        <LoadMore />
      </div>
    </>
  );
};
