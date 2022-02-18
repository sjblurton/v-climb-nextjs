import React from "react";

type Props = { isDisabled: boolean };

export const SubmitButton = ({ isDisabled }: Props) => {
  return (
    <button
      className={
        isDisabled
          ? "btn-olive disabled-btn w-full mt-4"
          : "btn-olive w-full mt-4"
      }
      type="submit"
      disabled={isDisabled}
    >
      Add
    </button>
  );
};
