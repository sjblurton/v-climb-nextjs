import { ErrorMessage, Field } from "formik";
import React from "react";

type Props = { placeholder: string; name: string; textarea?: boolean };

export const FormikTextInput = ({
  name,
  placeholder,
  textarea = false,
}: Props) => {
  return (
    <>
      <div className="flex items-center border-b border-olive-200 py-2">
        {textarea ? (
          <Field
            className="placeholder-olive-200 appearance-none bg-transparent border-none w-full text-olive-50 mr-3 py-1 px-2 leading-tight focus:ring-0"
            placeholder={placeholder}
            autoComplete="off"
            type="text"
            component="textarea"
            rows="4"
            name={name}
          />
        ) : (
          <Field
            className="placeholder-olive-200 appearance-none bg-transparent border-none w-full text-olive-50 mr-3 py-1 px-2 leading-tight focus:ring-0"
            placeholder={placeholder}
            autoComplete="off"
            type="text"
            name={name}
          />
        )}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      />
    </>
  );
};
