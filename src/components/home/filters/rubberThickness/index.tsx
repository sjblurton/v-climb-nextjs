import { RubberThicknessType } from "@prisma/client";
import { Checkbox } from "../checkbox";

export const RubberThicknessFilter = () => {
  const rubberThickness = Object.keys(RubberThicknessType);
  return (
    <>
      {rubberThickness.map((type) => {
        return (
          <Checkbox
            key={type}
            filterGroup="rubberThickness"
            id={type}
            label={type.toLocaleLowerCase()}
          />
        );
      })}
    </>
  );
};
