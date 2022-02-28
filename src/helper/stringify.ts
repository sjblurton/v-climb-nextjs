import { format } from "date-fns";
import { BrandList } from "../interface";

const stringifyDate = (date: Date) => format(new Date(date), "do MMMM yyyy");

interface Data {
  createdAt: Date;
  updatedAt: Date;
}

export const stringifyTheDates = <T extends Data[]>(array: T) => {
  const newArray = array.map((item) => {
    const createDate = stringifyDate(item.createdAt);
    const updatedDate = stringifyDate(item.updatedAt);
    return {
      ...item,
      createdAt: createDate,
      updatedAt: updatedDate,
    };
  });
  return newArray;
};

export const envString = (string: string) =>
  typeof process.env[string] === "string"
    ? process.env[string]
    : undefined && console.error("environmental variable is undefined");

export const brandNameFromId = (brands: BrandList[], id: string): string => {
  const brand = brands.filter((item) => item.id === id)[0].name;
  return brand;
};

export const slugString = (brand: string, name: string) =>
  [...brand.toLowerCase().split(" "), ...name.toLowerCase().split(" ")].join(
    "-"
  );

export const queryString = (type: string, arr: string[]): string => {
  if (arr.length === 0) return "";
  return arr.map((item) => `&${type}=${item}`).join("");
};
