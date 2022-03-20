import React, { useContext } from "react";
import { BrandWithStringDates, ShoeWithStringDates } from "../../../interface";
import { Card } from "../../shared";
import { FilterContext } from "../../../context/context";
import { LoadMore } from "../more";
import { Masonry } from "masonic";

type Props = {
  shoes: ShoeWithStringDates[];
  brands: BrandWithStringDates[];
};

type MasonryCardProps = {
  index: number;
  data: ShoeWithStringDates;
  width: number;
};

export const ShoeGrid = ({ shoes, brands }: Props) => {
  const { state } = useContext(FilterContext);

  const MasonryCard = ({ data }: MasonryCardProps) => {
    const brand = brands.filter((item) => item.id === data.brandId)[0].name;
    return <Card shoe={data} brand={brand} />;
  };

  return (
    <div className="sm:col-span-8 md:col-span-9 gap-4 lg:col-span-10 my-4 h-screen">
      <Masonry
        columnGutter={8}
        columnWidth={320}
        items={state.filteredShoes.length === 0 ? shoes : state.filteredShoes}
        render={MasonryCard}
      />
      <LoadMore />
    </div>
  );
};
