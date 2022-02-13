import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { BrandList, RubberList } from "../../interface";
import { Get, Post } from "../../service/database";

export const AddRubber = () => {
  const [rubberList, setRubberList] = useState<RubberList[]>([]);

  useEffect(() => {
    const fetchRubbersList = async () => {
      const list = await Get.Rubbers();
      if (list) {
        setRubberList(list.rubbers);
      }
    };
    fetchRubbersList();
    return () => {
      setRubberList([]);
    };
  }, []);

  return (
    <div className="w-full max-w-sm">
      <Formik
        initialValues={{
          name: "",
          stiffness: "",
          brandId: "",
          description: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required")
            .test(
              "existsCheck",
              "Rubber already exists",
              (value) =>
                !rubberList
                  .map((item) => item.name.toLowerCase())
                  .includes(value ? value.toLowerCase() : "")
            ),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          //   const res = await Post.Brand(values);
          console.log(values);
          //   setBrandList([...brandList, values.name]);
          //   setSubmitting(false);
          //   resetForm({
          //     values: { name: "", brandId: "", description: "", stiffness: "" },
          //   });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="flex items-center border-b border-olive-200 py-2">
              <Field
                className="placeholder-olive-200 appearance-none bg-transparent border-none w-full text-olive-50 mr-3 py-1 px-2 leading-tight focus:ring-0"
                placeholder="Rubber name..."
                autoComplete="off"
                type="text"
                name="name"
              />
            </div>
            <ErrorMessage
              name="name"
              component="div"
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            />
            <div className="flex items-center border-b border-olive-200 py-2 justify-between">
              <span className="text-olive-200">Stiffness:</span>
              <Field
                name="stiffness"
                as="select"
                className="focus:ring-olive-50 form-select appearance-none block w-1/2 px-3 py-1.5 text-base font-normal text-olive-50 bg-transparent bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-olive-600 focus:outline-none"
              >
                <option value="SOFT">Soft</option>
                <option value="AVERAGE">Average</option>
                <option value="STIFF">Stiff</option>
              </Field>
            </div>
            <ErrorMessage
              name="stiffness"
              component="div"
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            />

            <button
              className="btn btn-olive"
              type="submit"
              disabled={isSubmitting}
            >
              Add
            </button>
          </Form>
        )}
      </Formik>
      <table className="table-auto my-4 text-olive-50">
        <thead>
          <tr>
            <th>Rubber</th>
          </tr>
        </thead>
        <tbody>
          {/* {brandList &&
            brandList.map((item, i) => (
              <tr key={i}>
                <td>{item}</td>
              </tr>
            ))} */}
        </tbody>
      </table>
    </div>
  );
};
