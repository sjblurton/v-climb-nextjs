// import { GoodFor, Shoes } from "../interface";

// export const whatIsItGoodFor = (shoe: Shoes) => {
//   let goodFor: GoodFor[] = [];
//   isIndoorShoe(shoe) && goodFor.push("Indoor");
//   isBeginnerShoe(shoe) && goodFor.push("Beginners");
//   isAllRoundShoe(shoe) && goodFor.push("All Round");
//   isBigWallShoe(shoe) && goodFor.push("Big Wall");
//   isGraniteShoe(shoe) && goodFor.push("Granite");
//   isSteepLimestoneWithTufasShoe(shoe) &&
//     goodFor.push("Steep Limestone with Tufas");
//   isSteepLimestoneShoe(shoe) && goodFor.push("Steep Limestone");
//   isVerticalLimestoneShoe(shoe) && goodFor.push("Vertical Limestone");
//   isSandstoneSmoothShoe(shoe) && goodFor.push("Smooth Sandstone");
//   isSandstoneCoarseShoe(shoe) && goodFor.push("Coarse Sandstone");
//   isSandstoneSteep(shoe) && goodFor.push("Steep Sandstone");
//   !isGoodOver75kg(shoe) && shoe.volume !== "KIDS" && goodFor.push("under 75kg");
//   !isGoodUnder55kg(shoe) && shoe.volume !== "KIDS" && goodFor.push("over 55kg");
//   return goodFor;
// };

// const isFlatShoe = ({ asymmetry, profile }: Shoes) =>
//   asymmetry === "LOW" && profile === "FLAT";

// const isModerateShoe = ({ asymmetry, profile }: Shoes) =>
//   asymmetry === "MEDIUM" && profile === "MODERATE";

// export const isIndoorShoe = ({ midsole, profile, hooking }: Shoes) =>
//   midsole !== "STIFF" && profile !== "FLAT" && hooking === "SPECIALIZED";

// export const isBeginnerShoe = (shoe: Shoes) => {
//   const { midsole, price, rubber_thickness } = shoe;
//   return (
//     midsole === "STIFF" &&
//     isFlatShoe(shoe) &&
//     price === "ECONOMIC" &&
//     rubber_thickness === "THICKER"
//   );
// };

// export const isAllRoundShoe = (shoe: Shoes) =>
//   shoe.midsole === "AVERAGE" && isModerateShoe(shoe);

// export const isBigWallShoe = (shoe: Shoes) =>
//   shoe.midsole === "STIFF" && isFlatShoe(shoe) && shoe.closure === "LASES";

// const isSteepOverhangShoe = ({ midsole, profile }: Shoes) => {
//   return profile === "AGGRESSIVE" && midsole === "SOFT";
// };

// export const isGraniteShoe = (shoes: Shoes) => {
//   const { midsole, rubber } = shoes;
//   return midsole === "AVERAGE" && rubber !== "SOFT" && isModerateShoe(shoes);
// };

// export const isSteepLimestoneWithTufasShoe = (shoes: Shoes) => {
//   return isSteepOverhangShoe(shoes) && shoes.hooking === "SPECIALIZED";
// };

// export const isSteepLimestoneShoe = (shoes: Shoes) =>
//   isSteepOverhangShoe(shoes) && shoes.asymmetry === "HIGH";

// export const isVerticalLimestoneShoe = (shoes: Shoes) =>
//   shoes.midsole !== "SOFT" && isModerateShoe(shoes);

// const isSandstoneCoarseShoe = (shoes: Shoes) => isAllRoundShoe(shoes);

// export const isSandstoneSmoothShoe = ({ midsole, profile, hooking }: Shoes) =>
//   midsole !== "STIFF" && profile !== "AGGRESSIVE" && hooking === "SPECIALIZED";

// export const isSandstoneSteep = ({ midsole, profile, asymmetry }: Shoes) => {
//   return midsole !== "STIFF" && profile !== "FLAT" && asymmetry !== "LOW";
// };

// export const isGoodOver75kg = ({ rubber }: Shoes) => rubber === "STIFF";

// export const isGoodUnder55kg = ({ rubber }: Shoes) => rubber !== "STIFF";
