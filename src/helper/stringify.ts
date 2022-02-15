import superjson from "superjson";
import { BrandList } from "../interface";

const stringifyDate = (date: Date) => superjson.stringify(date).split('"')[3];

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
