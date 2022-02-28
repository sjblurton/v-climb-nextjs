import { AsymmetryType } from "@prisma/client";
import { Checkbox } from "../checkbox";

export const AsymmetryFilter = () => {
  const asymmetry = Object.keys(AsymmetryType);
  return (
    <>
      {asymmetry.map((type) => {
        return (
          <Checkbox
            key={type}
            filterGroup="asymmetry"
            id={type}
            label={type.toLocaleLowerCase()}
          />
        );
      })}
    </>
  );
};
