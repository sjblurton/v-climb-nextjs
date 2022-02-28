import React from "react";
import { selectLists } from "../../../helper/helper";
import { useBrands } from "../../../hooks/custom";
import { Message } from "../../shared";
import { Select } from "../select";
import { FormikTextInput } from "../textInput";

export const RubberInputs = () => {
  const { brandsData, isLoading } = useBrands();

  if (isLoading) return <Message>Loading...</Message>;

  if (brandsData)
    return (
      <>
        <FormikTextInput name="name" placeholder="Rubber name..." />
        <Select data={selectLists.stiffness} name="stiffness" />
        <Select
          name="brandId"
          data={brandsData.brands.map((brand) => {
            return { value: brand.id, name: brand.name };
          })}
        />
        <FormikTextInput
          name="description"
          placeholder="Write a brief description..."
          textarea={true}
        />
        <FormikTextInput name="image" placeholder="Logo URL..." />
      </>
    );
  return <Message>Ops... something went wrong.</Message>;
};
