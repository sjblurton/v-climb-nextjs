import { useBrands, useRubbers } from "../../../../hooks/custom";
import { Checkbox } from "../checkbox";
import { Tooltip } from "./tooltip";

export const RubbersFilter = () => {
  const { rubbersData } = useRubbers();
  const { brandsData } = useBrands();
  return (
    <>
      {rubbersData?.rubbers.map((rubber) => {
        const title =
          brandsData?.brands.filter((brand) => rubber.brandId === brand.id)[0]
            .name +
          " - " +
          rubber.name;

        return (
          <Tooltip key={rubber.id} rubber={rubber}>
            <div>
              <Checkbox
                key={rubber.id}
                filterGroup="rubber"
                id={rubber.id}
                label={title}
              />
            </div>
          </Tooltip>
        );
      })}
    </>
  );
};
