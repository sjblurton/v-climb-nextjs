import { VeganType } from "@prisma/client";
import { veganToString } from "../../../../helper/helper";
import { Checkbox } from "../checkbox";

export const VeganFilter = () => {
  const veganList = Object.keys(VeganType);
  return (
    <>
      {veganList.map((vegan) => {
        return (
          <Checkbox
            key={vegan}
            filterGroup="vegan"
            id={vegan}
            label={veganToString(vegan as VeganType)}
          />
        );
      })}
    </>
  );
};
