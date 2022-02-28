import { StiffnessType } from "@prisma/client";
import { Checkbox } from "../checkbox";

export const MidsoleFilter = () => {
  const stiffness = Object.keys(StiffnessType);
  return (
    <>
      {stiffness.map((midsole) => {
        return (
          <Checkbox
            key={midsole}
            filterGroup="midsole"
            id={midsole}
            label={midsole.toLocaleLowerCase()}
          />
        );
      })}
    </>
  );
};
