import { ErrorMessage, Field } from "formik";
import React from "react";

type Data = { value: string; name: string };

type Props = { name: string; data: Data[] };

export const Select = ({ name, data }: Props) => {
  return (
    <>
      <div className="flex items-center border-b border-olive-200 py-2 justify-between">
        <span className="text-olive-200 capitalize">{name}:</span>
        <Field
          name={name}
          as="select"
          className="capitalize focus:ring-olive-50 form-select appearance-none block w-1/2 px-3 py-1.5 text-base font-normal text-olive-50 bg-transparent bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-olive-600 focus:outline-none"
        >
          {data.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </Field>
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      />
    </>
  );
};
