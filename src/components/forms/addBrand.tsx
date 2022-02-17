import { Formik, Form, Field, ErrorMessage } from "formik";
import { MouseEvent, useState } from "react";
import * as Yup from "yup";
import { useBrands } from "../../hooks/custom";
import { Post } from "../../service/database";
import { MyDialog } from "../modal";

export const AddBrand = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ id: "", name: "" });
  const { brandsData, isError, mutate } = useBrands();

  console.log(brandsData?.brands);

  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    data: { id: string; name: string }
  ) => {
    e.preventDefault();
    setData(data);
    setIsOpen(true);
  };
  if (isError) return <p>{isError}</p>;
  if (brandsData) {
    return (
      <div className="w-full max-w-sm">
        <MyDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          mutate={mutate}
        />
        <Formik
          initialValues={{ name: "" }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required")
              .test(
                "existsCheck",
                "Brand already exists",
                (value) =>
                  !brandsData.brands
                    .map((item) => item.name.toLowerCase())
                    .includes(value ? value.toLowerCase() : "")
              ),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            const res = await Post.Brand(values);
            console.log(res);
            setSubmitting(false);
            resetForm({ values: { name: "" } });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex items-center border-b border-olive-200 py-2">
                <Field
                  className="text-input"
                  placeholder="Add a new brand..."
                  autoComplete="off"
                  type="text"
                  name="name"
                />
                <button
                  className="btn-olive"
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
            {brandsData.brands.map((item) => {
              const data = { id: item.id, name: item.name };
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button className="btn-olive">edit</button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleClick(e, data)}
                      className="btn-danger"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return <p>Loading...</p>;
};
