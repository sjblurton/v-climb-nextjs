import { useBrands } from "../../../../hooks/custom";
import { Checkbox } from "../checkbox";

export const BrandsFilter = () => {
  const { brandsData } = useBrands();

  return (
    <>
      {brandsData?.brands.map((brand) => (
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
