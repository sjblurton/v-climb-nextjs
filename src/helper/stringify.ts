import superjson from "superjson";
import { BrandList } from "../interface";

const stringifyDate = (date: Date) => superjson.stringify(date).split('"')[3];

export const objectWithStringifiedDates = (
  createdAt: Date,
  updatedAt: Date
) => {
  return {
    createdAt: stringifyDate(createdAt),
    updatedAt: stringifyDate(updatedAt),
  };
};

export const envString = (string: string) =>
  typeof process.env[string] === "string"
    ? process.env[string]
    : undefined && console.error("environmental variable is undefined");

export const brandNameFromId = (brands: BrandList[], id: string): string => {
  const brand = brands.filter((item) => item.id === id)[0].name;
  return brand;
};
