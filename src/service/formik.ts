import { FormikHelpers } from "formik";
import { KeyedMutator } from "swr";
import {
  BrandWithStringDates,
  RubberPost,
  RubberWithStringDates,
} from "../interface";
import { axiosPost } from "./axios";

export const brandInitialValues = { name: "" };
export const rubberInitialValues: RubberPost = {
  name: "",
  stiffness: "AVERAGE",
  brandId: "",
  description: "",
  image: "",
};

export const onSubmit = {
  addBrand: async (
    values: typeof brandInitialValues,
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<{
      name: string;
    }>,
    mutate: KeyedMutator<{
      brands: BrandWithStringDates[];
    }>
  ) => {
    setSubmitting(true);
    const res = await axiosPost.postBrand(values);
    setSubmitting(false);
    resetForm({ values: brandInitialValues });
    mutate();
    if (res.brands) {
      return { message: `${res.brands.name} has been added.`, type: "success" };
    }
    if (res.error) {
      return { message: `${res.error.brands}.`, type: "error" };
    }
  },
  addRubber: async (
    values: RubberPost,
    { setSubmitting, resetForm }: FormikHelpers<RubberPost>,
    mutate: KeyedMutator<{
      rubbers: RubberWithStringDates[];
    }>
  ) => {
    setSubmitting(true);
    const res = await axiosPost.postRubber(values);
    setSubmitting(false);
    resetForm({ values: rubberInitialValues });
    mutate();
    if (res.rubbers) {
      return {
        message: `${res.rubbers.name} has been added.`,
        type: "success",
      };
    }
    if (res.error) {
      return { message: `${res.error.rubbers}.`, type: "error" };
    }
  },
};
