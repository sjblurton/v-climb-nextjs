import React, { Dispatch, SetStateAction } from "react";

type Props = {
  label: string;
  checked: string;
  setChecked: Dispatch<SetStateAction<string>>;
};

export const RadioButton = ({ label, checked, setChecked }: Props) => {
  const isChecked = label === checked;

  return (
    <label className="inline-flex items-center mt-3 px-2">
      <input
        onChange={() => setChecked(label)}
        checked={isChecked}
        type="radio"
        className="form-radio h-5 w-5 text-olive-500 focus:outline-olive-200"
      />
      <span className="ml-2 text-gray-200 capitalize">{label}</span>
    </label>
  );
};
