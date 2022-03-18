import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../../context/context";
import {
  BrandWithStringDates,
  RubberWithStringDates,
} from "../../../../interface";
import { Checkbox } from "../checkbox";

interface RubberFilter extends RubberWithStringDates {
  title: string;
}

type Props = {
  rubbers: RubberWithStringDates[];
  brands: BrandWithStringDates[];
};

export const RubbersFilter = ({ rubbers, brands }: Props) => {
  const [rubberList, setRubberList] = useState<RubberFilter[]>([]);
  const { state } = useContext(FilterContext);

  useEffect(() => {
    if (state.filteredRubbers.length > 0 && state.brands.length > 0) {
      const array = state.filteredRubbers.map((rubber) => {
        const title =
          state.brands.filter((brand) => rubber.brandId === brand.id)[0].name +
          " - " +
          rubber.name;
        return { title: title, ...rubber };
      });
      const sortedArray = array.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      setRubberList(sortedArray);
    }
  }, [state]);

  if (rubberList.length > 0) {
    return (
      <>
        {rubberList.map((rubber) => {
          const title =
            state.brands.filter((brand) => rubber.brandId === brand.id)[0]
              .name +
            " - " +
            rubber.name;

          return (
            <div key={rubber.id}>
              <Checkbox
                key={rubber.id}
                filterGroup="rubber"
                id={rubber.id}
                label={title}
              />
            </div>
          );
        })}
      </>
    );
  }
  return (
    <>
      {rubbers.map((rubber) => {
        const title =
          brands.filter((brand) => rubber.brandId === brand.id)[0].name +
          " - " +
          rubber.name;

        return (
          <div key={rubber.id}>
            <Checkbox
              key={rubber.id}
              filterGroup="rubber"
              id={rubber.id}
              label={title}
            />
          </div>
        );
      })}
    </>
  );
};
