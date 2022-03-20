import { PriceType } from "@prisma/client";
import { Checkbox } from "../checkbox";

export const PriceFilter = () => {
  const price = Object.keys(PriceType);
  return (
    <>
      {price.map((type) => {
        return (
          <Checkbox
            key={type}
            filterGroup="price"
            id={type}
            label={type.toLocaleLowerCase()}
          />
        );
      })}
    </>
  );
};
