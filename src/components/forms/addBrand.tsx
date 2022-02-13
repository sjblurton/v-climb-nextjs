import { Formik, Form, Field, ErrorMessage } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import { BrandList } from "../../interface";
import { Get, Post } from "../../service/database";

interface Props {
  brandList: { brands: BrandList[] };
  setBrandList: Dispatch<
    SetStateAction<{
      brands: BrandList[];
    }>
  >;
}

export const AddBrand = (props: Props) => {
  const [brandList, setBrandList] = useState<{ brands: BrandList[] }>({
    brands: [],
  });

  useEffect(() => {
    const fetchBrandsList = async () => {
      const list = await Get.Brands();
      if (list) {
        setBrandList(list);
      }
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
            .test("existsCheck", "Brand already exists", (value) =>
              brandList.brands
                .map((item) => item.name.toLowerCase())
                .includes(value ? value.toLowerCase() : "")
            ),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const res = await Post.Brand(values);
          console.log(res);

          // setBrandList([...brandList, res]);
          setSubmitting(false);
          resetForm({ values: { name: "" } });
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
      <table className="table-auto my-4 text-olive-50 w-full">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {brandList &&
            brandList.brands.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <button className="btn btn-olive">edit</button>
                </td>
                <td>
                  <button className="btn btn-olive">delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
