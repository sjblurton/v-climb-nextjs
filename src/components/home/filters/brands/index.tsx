import { useContext } from "react";
import { FilterContext } from "../../../../context/context";
import { BrandWithStringDates } from "../../../../interface";
import { Checkbox } from "../checkbox";

type Props = {
  brands: BrandWithStringDates[];
};

export const BrandsFilter = ({ brands }: Props) => {
  const { state } = useContext(FilterContext);
  if (state.filteredBrands.length > 0) {
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
  }
  return (
    <>
      {brands.map((brand) => (
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
