import { Formik, Form, Field, ErrorMessage } from "formik";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { BrandList } from "../../interface";
import { Post } from "../../service/database";
import { MyDialog } from "../modal";

interface Props {
  brandList: { brands: BrandList[] };
  setBrandList: Dispatch<
    SetStateAction<{
      brands: BrandList[];
    }>
  >;
}

export const AddBrand = ({ brandList, setBrandList }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ id: "", name: "" });
  const handleClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    data: { id: string; name: string }
  ) => {
    e.preventDefault();
    setData(data);
    setIsOpen(true);
  };

  return (
    <div className="w-full max-w-sm">
      <MyDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={data}
        setBrandList={setBrandList}
        brandList={brandList}
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
                !brandList.brands
                  .map((item) => item.name.toLowerCase())
                  .includes(value ? value.toLowerCase() : "")
            ),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const res = await Post.Brand(values);
          const newList = { brands: [...brandList.brands, res] };
          setBrandList(newList);
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
          {brandList &&
            brandList.brands.map((item) => {
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
};
