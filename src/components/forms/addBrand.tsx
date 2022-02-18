import { Formik, Form, Field, ErrorMessage } from "formik";
import { MouseEvent, useState } from "react";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import { deleteById } from "../../helper/helper";
import { useBrands } from "../../hooks/custom";
import { DeleteByID } from "../../interface";
import { axiosPost } from "../../service/axios";
import { MyDialog } from "../modal";

export const AddBrand = () => {
  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DeleteByID>({
    id: "",
    name: "",
    type: "BRAND",
  });
  const { brandsData, isError, mutate } = useBrands();

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
            setSubmitting(true);
            const res = await axiosPost.postBrand(values);
            if (res.brands) {
              alert.show(`${res.brands.name} has been added.`, {
                type: "success",
              });
            }
            if (res.error) {
              alert.show(`${res.error.brands}.`, { type: "error" });
            }
            setSubmitting(false);
            resetForm({ values: { name: "" } });
            mutate();
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
                  className={
                    isSubmitting ? "btn-olive disabled-btn" : "btn-olive"
                  }
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
              const data: DeleteByID = {
                id: item.id,
                name: item.name,
                type: "BRAND",
              };
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <button className="btn-olive">edit</button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => deleteById(e, data, setIsOpen, setData)}
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
