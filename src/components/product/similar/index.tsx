import React, { useContext } from "react";
import { FilterContext } from "../../../context/context";
import { useBrands } from "../../../hooks/custom";
import { ShoeWithStringDates } from "../../../interface";
import { Card } from "../../shared";

type Props = { shoes: ShoeWithStringDates[]; brand: string; name: string };

export const SimilarTo = ({ shoes, brand, name }: Props) => {
  const { brandsData } = useBrands();

  return (
    <>
      <h2 className="text-slate-100 text-xl w-full mt-4">
        Vegan climbing shoes similar too {`${brand}'s - ${name}`}...
      </h2>
      <div className="sm:col-span-8 md:col-span-9 gap-4 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lx:grid-cols-4 my-4">
        {brandsData &&
          shoes.map((shoe) => {
            const shoeBrand = brandsData.brands.filter(
              (item) => item.id === shoe.brandId
            )[0].name;
            return <Card key={shoe.id} shoe={shoe} brand={shoeBrand} />;
          })}
      </div>
    </>
  );
};
