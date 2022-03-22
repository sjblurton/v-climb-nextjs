import React from "react";
import { selectLists } from "../../../helper/main";
import { useBrands, useRubbers } from "../../../hooks/custom";
import { Message } from "../../shared";
import { Select } from "../select";
import { FormikTextInput } from "../textInput";

type Props = {};

export const ShoeInputs = (props: Props) => {
  const { brandsData, isLoading } = useBrands();
  const { rubbersData, isLoading: rubberLoading } = useRubbers();

  if (isLoading || rubberLoading) return <Message>Loading...</Message>;

  if (brandsData && rubbersData)
    return (
      <>
        <Select
          name="brandId"
          data={brandsData.brands.map((brand) => {
            return { value: brand.id, name: brand.name };
          })}
        />
        <Select
          name="rubberId"
          data={rubbersData.rubbers.map((brand) => {
            return { value: brand.id, name: brand.name };
          })}
        />
        <FormikTextInput name="name" placeholder="Shoe name..." />
        <Select data={selectLists.vegan} name="veganType" />
        <Select data={selectLists.asymmetry} name="asymmetry" />
        <Select data={selectLists.profile} name="profile" />
        <Select data={selectLists.closure} name="closure" />
        <Select data={selectLists.hooking} name="hooking" />
        <Select
          data={[
            { value: "YES", name: "yes" },
            { value: "NO", name: "no" },
          ]}
          name="ankle protection"
        />
        <Select data={selectLists.rubber_thickness} name="rubber thickness" />
        <Select data={selectLists.price} name="price" />
        <Select data={selectLists.stiffness} name="midsole" />
        <Select data={selectLists.volume} name="volume" />
        <FormikTextInput
          name="description"
          placeholder="Write a brief description..."
          textarea={true}
        />
        <FormikTextInput name="image" placeholder="Image of shoe URL..." />
        <FormikTextInput name="url" placeholder="URL to more information..." />
      </>
    );
  return <Message>Ops... something went wrong.</Message>;
};
