import { StiffnessType } from "@prisma/client";
import { Checkbox } from "../checkbox";

export const RubberStiffnessFilter = () => {
  const stiffness = Object.keys(StiffnessType);
  return (
    <>
      {stiffness.map((stiffness) => {
        return (
          <Checkbox
            key={stiffness}
            filterGroup="rubberStiffness"
            id={stiffness}
            label={stiffness.toLocaleLowerCase()}
          />
        );
      })}
    </>
  );
};
