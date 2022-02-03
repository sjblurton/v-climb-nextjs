import superjson from "superjson";

const stringifyDate = (date: Date) => {
  return superjson.stringify(date).split('"')[3];
};
export const objectWithStringifiedDates = (
  createdAt: Date,
  updatedAt: Date
) => {
  return {
    createdAt: stringifyDate(createdAt),
    updatedAt: stringifyDate(updatedAt),
  };
};

export const envFile = (string: string) => {
  return typeof process.env[string] === "string"
    ? process.env[string]
    : undefined && console.error("environmental variable is undefined");
};
