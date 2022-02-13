import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { BrandList } from "../../interface";
import { Get, Post } from "../../service/database";

type Props = {};

type Errors = { brand?: string };

export const AddBrand = (props: Props) => {
  const [brandList, setBrandList] = useState<string[]>([]);

  useEffect(() => {
    const fetchBrandsList = async () => {
      const list = await Get.Brands();
      const names = list.brands.map((item) => item.name.toLowerCase());
      setBrandList(names);
    };
    fetchBrandsList();
  }, []);

  return (
    <div className="w-full max-w-sm">
      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required")
            .test(
              "existsCheck",
              "Brand already exists",
              (value) => !brandList.includes(value ? value.toLowerCase() : "")
            ),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await Post.Brand(values);
          setBrandList([...brandList, values.name]);
          setSubmitting(false);
          console.log(res);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex items-center border-b border-olive-200 py-2">
              <Field
                className="placeholder-olive-200 appearance-none bg-transparent border-none w-full text-olive-50 mr-3 py-1 px-2 leading-tight focus:ring-0"
                placeholder="Add a new brand..."
                autoComplete="off"
                type="text"
                name="name"
              />
              <button
                className="btn btn-olive"
                type="submit"
                disabled={isSubmitting}
              >
                Add
              </button>
            </div>
            <ErrorMessage
              name="name"
              component="div"
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
