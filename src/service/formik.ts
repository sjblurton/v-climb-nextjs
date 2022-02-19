import { FormikHelpers } from "formik";
import { KeyedMutator } from "swr";
import {
  BrandPost,
  BrandWithStringDates,
  RubberPost,
  RubberWithStringDates,
  ShoePost,
  ShoePostInput,
  ShoeWithStringDates,
} from "../interface";
import { axiosPost, axiosPut } from "./axios";

export const brandInitialValues: BrandPost = { name: "" };

export const rubberInitialValues: RubberPost = {
  name: "",
  stiffness: "AVERAGE",
  brandId: "9abf4a88-13f8-4b26-a948-39d7daac98b0",
  description: "",
  image: "",
};

export const shoesInitialValues: ShoePostInput = {
  rubberId: "444ba067-961f-4f3f-826a-114d5deddd58",
  brandId: "9abf4a88-13f8-4b26-a948-39d7daac98b0",
  name: "",
  slug: "",
  veganType: "NOT",
  price: "AVERAGE",
  volume: "AVERAGE",
  closure: "VELCRO",
  hooking: "AVERAGE",
  asymmetry: "MEDIUM",
  profile: "MODERATE",
  "rubber thickness": "THINNER",
  midsole: "AVERAGE",
  "ankle protection": "NO",
  description: "",
  url: "",
  image: "",
  ankle_protection: false,
  rubber_thickness: "THINNER",
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
  addShoe: async (
    values: ShoePost,
    { setSubmitting, resetForm }: FormikHelpers<ShoePost>,
    mutate: KeyedMutator<{
      shoes: ShoeWithStringDates[];
    }>
  ) => {
    setSubmitting(true);
    try {
      const res = await axiosPost.postShoes(values);
      setSubmitting(false);
      resetForm({ values: shoesInitialValues });
      mutate();
      if (res.shoes) {
        return {
          message: `${res.shoes.name} has been added.`,
          type: "success",
        };
      }
      if (res.error) {
        return { message: `${res.error.shoes}.`, type: "error" };
      }
    } catch (error) {
      return { message: `Ops, something went wrong.`, type: "error" };
    }
  },
  updateBrand: async (
    id: string,
    values: BrandPost,
    { setSubmitting }: FormikHelpers<BrandPost>
  ) => {
    setSubmitting(true);
    const res = await axiosPut.brand(id, values);
    setSubmitting(false);
    if (res.brandName) {
      return {
        message: `${res.brandName} has been updated.`,
        type: "success",
      };
    }
    if (res.error) {
      return { message: `${res.error.brand}.`, type: "error" };
    }
  },
};
