import * as Yup from "yup";
import { BrandWithStringDates } from "../interface";

export const brandsSchema = (data: BrandWithStringDates[]) => {
  return Yup.object({
    name: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required")
      .test(
        "existsCheck",
        "Brand already exists",
        (value) =>
          !data
            .map((item) => item.name.toLowerCase())
            .includes(value ? value.toLowerCase() : "")
      ),
  });
};
