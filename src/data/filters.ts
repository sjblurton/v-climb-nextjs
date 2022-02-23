import { BrandWithStringDates, RubberWithStringDates } from "../interface";

export const initialCheckboxState = (
  brands: BrandWithStringDates[],
  rubbers: RubberWithStringDates[]
) => {
  const rubbersNames = rubbers.map((rubber) => {
    return { [rubber.name]: false };
  });
  const brandName = brands.map((shoe) => {
    return { [shoe.name]: false };
  });
  const brandObj = Object.assign({}, ...brandName);
  return {
    brand: rubbersNames,
    rubber: brandObj,
    "rubber stiffness": { SOFT: false, AVERAGE: false, STIFF: false },
    midsole: { SOFT: false, AVERAGE: false, STIFF: false },
    profile: { flat: false, moderate: false, aggressive: false },
    volume: { LOW: false, AVERAGE: false, WIDE: false, KIDS: false },
    asymmetry: { LOW: false, MEDIUM: false, HIGH: false },
  };
};
