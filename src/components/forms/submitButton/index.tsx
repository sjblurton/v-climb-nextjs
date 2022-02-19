import React, { ReactNode } from "react";

type Props = { isDisabled: boolean; children: ReactNode };

export const SubmitButton = ({ isDisabled, children }: Props) => {
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
      {children}
    </button>
  );
};
