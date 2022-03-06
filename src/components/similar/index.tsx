import React, { useContext } from "react";
import { FilterContext } from "../../context/context";
import { ShoeWithStringDates } from "../../interface";
import { Card } from "../card";

type Props = { shoes: ShoeWithStringDates[]; similar: string };

export const SimilarTo = ({ shoes, similar }: Props) => {
  const { state } = useContext(FilterContext);

  return (
    <>
      <h2 className="text-slate-100 text-xl w-full mt-4">
        Vegan climbing shoes similar too {similar}...
      </h2>
      <div className="sm:col-span-8 md:col-span-9 gap-4 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lx:grid-cols-4 my-4">
        {state.brands.length > 0 &&
          shoes.map((shoe) => {
            const shoeBrand =
              state.brands.filter((item) => item.id === shoe.brandId)[0].name ||
              "not found";
            return <Card key={shoe.id} shoe={shoe} brand={shoeBrand} />;
          })}
      </div>
    </>
  );
};
