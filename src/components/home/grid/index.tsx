import React from "react";
import { brandNameFromId } from "../../../helper/stringify";
import { useBrands, useShoes } from "../../../hooks/custom";
import { BrandWithStringDates, ShoeWithStringDates } from "../../../interface";
import { Card } from "../../shared";

export const ShoeGrid = () => {
  const { shoesData } = useShoes();
  const { brandsData } = useBrands();

  console.log(shoesData);

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

  if (shoesData?.shoes?.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center mt-4 sm:col-span-8 md:col-span-9 lg:col-span-10">
        <h3 className="text-slate-100 text-lg text-center w-full">
          No shoes found, please try again...
        </h3>
      </div>
    );
  }

  if (shoesData && brandsData) {
    console.log(shoesData);
    return (
      <div className="sm:col-span-8 md:col-span-9 gap-4 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lx:grid-cols-4 my-4">
        {card(shoesData.shoes, brandsData.brands)}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center mt-4 sm:col-span-8 md:col-span-9 lg:col-span-10">
      <h3 className="text-slate-100 text-lg text-center w-full">Loading...</h3>
    </div>
  );
};
