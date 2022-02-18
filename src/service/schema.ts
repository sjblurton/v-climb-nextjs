import * as Yup from "yup";
import { BrandWithStringDates, RubberWithStringDates } from "../interface";

const URL =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

export const schemas = {
  brand: (data: BrandWithStringDates[]) => {
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
  },
  rubber: (
    rubbersData: RubberWithStringDates[],
    brandsData: BrandWithStringDates[]
  ) => {
    return Yup.object({
      name: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required")
        .test(
          "existsCheck",
          "Rubber already exists",
          (value) =>
            !rubbersData
              .map((item) => item.name.toLowerCase())
              .includes(value ? value.toLowerCase() : "")
        ),
      stiffness: Yup.string()
        .required("Required")
        .matches(/(SOFT|AVERAGE|STIFF)/),
      brandId: Yup.string()
        .required("Required")
        .test(
          "existsCheck",
          "Brand isn't available, please add new brand first.",
          (value) =>
            brandsData.map((item) => item.id).includes(value ? value : "")
        ),
      description: Yup.string().required("Required"),
      image: Yup.string()
        .required("Required")
        .matches(URL, "Enter a valid url"),
    });
  },
};