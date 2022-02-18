import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import { deleteById } from "../../helper/helper";
import { useBrands, useRubbers } from "../../hooks/custom";
import { DeleteByID, RubberPost } from "../../interface";
import { axiosPost } from "../../service/axios";
import { MyDialog } from "../modal";

export const AddRubber = () => {
  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DeleteByID>({
    id: "",
    name: "",
    type: "RUBBER",
  });

  const {
    rubbersData,
    isError: isRubberError,
    isLoading: isRubberLoading,
    mutate,
  } = useRubbers();

  const {
    brandsData,
    isError: isBrandsError,
    isLoading: isBrandsLoading,
  } = useBrands();

  if (isRubberError || isBrandsError)
    return (
      <p className="text-olive-50 text-center w-full">
        server error please try again...
      </p>
    );

  if (isRubberLoading || isBrandsLoading)
    return <p className="text-olive-50 text-center w-full">loading...</p>;

  const initialValues: RubberPost = {
    name: "",
    stiffness: "AVERAGE",
    brandId: "",
    description: "",
    image: "",
  };

  if (rubbersData && brandsData)
    return (
      <div className="w-full max-w-sm">
        <MyDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          mutate={mutate}
        />

        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required")
              .test(
                "existsCheck",
                "Rubber already exists",
                (value) =>
                  !rubbersData.rubbers
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
                  brandsData?.brands
                    .map((item) => item.id)
                    .includes(value ? value : "")
              ),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const res = await axiosPost.postRubber(values);
            if (res.rubbers) {
              alert.show(`${res.rubbers.name} has been added.`, {
                type: "success",
              });
            }
            if (res.error) {
              alert.show(`${res.error.rubbers}.`, { type: "error" });
            }
            setSubmitting(false);
            resetForm({ values: initialValues });
            mutate();
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
              <div className="flex items-center border-b border-olive-200 py-2 justify-between">
                <span className="text-olive-200">Brand:</span>
                <Field
                  name="brandId"
                  as="select"
                  className="focus:ring-olive-50 form-select appearance-none block w-1/2 px-3 py-1.5 text-base font-normal text-olive-50 bg-transparent bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-olive-600 focus:outline-none"
                >
                  {brandsData &&
                    brandsData.brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                </Field>
              </div>
              <ErrorMessage
                name="brandId"
                component="div"
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              />
              <div className="flex items-center border-b border-olive-200 py-2">
                <Field
                  className="placeholder-olive-200 appearance-none bg-transparent border-none w-full text-olive-50 mr-3 py-1 px-2 leading-tight focus:ring-0"
                  placeholder="Write a brief description..."
                  autoComplete="off"
                  type="text"
                  name="description"
                />
              </div>
              <ErrorMessage
                name="description"
                component="div"
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              />
              <div className="flex items-center border-b border-olive-200 py-2">
                <Field
                  className="placeholder-olive-200 appearance-none bg-transparent border-none w-full text-olive-50 mr-3 py-1 px-2 leading-tight focus:ring-0"
                  placeholder="Logo URL..."
                  autoComplete="off"
                  type="text"
                  name="image"
                />
              </div>
              <ErrorMessage
                name="image"
                component="div"
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              />
              <button
                className={
                  isSubmitting
                    ? "btn-olive disabled-btn mt-3"
                    : "btn-olive mt-3"
                }
                type="submit"
                disabled={isSubmitting}
              >
                Add
              </button>
            </Form>
          )}
        </Formik>
        <table className="table-auto my-4 text-olive-50 w-full">
          <thead>
            <tr>
              <th>Rubber</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {rubbersData &&
              rubbersData.rubbers.map((item, i) => {
                const data: DeleteByID = {
                  id: item.id,
                  name: item.name,
                  type: "RUBBER",
                };
                return (
                  <tr key={i}>
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
};
