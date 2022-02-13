import React, { MouseEvent } from "react";
import { Formik } from "formik";

type Props = {};

type Errors = { brand?: string };

export const AddBrand = (props: Props) => {
  return (
    <div className="w-full max-w-sm">
      <Formik
        initialValues={{ brand: "" }}
        validate={(values) => {
          const errors: Errors = {};
          if (!values.brand) {
            errors.brand = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center border-b border-olive-200 py-2">
              <input
                className="placeholder-olive-200 appearance-none bg-transparent border-none w-full text-olive-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Add a new brand..."
                type="text"
                name="brand"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.brand}
              />
            </div>
            {errors.brand && touched.brand && errors.brand}
            <button
              type="submit"
              className="btn btn-olive"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
