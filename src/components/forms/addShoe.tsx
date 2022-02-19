import { StiffnessType } from "@prisma/client";
import { Formik, Form } from "formik";
import { useState } from "react";
import { AlertType, useAlert } from "react-alert";
import { selectLists } from "../../helper/helper";
import { useBrands, useRubbers, useShoes } from "../../hooks/custom";
import { DeleteByID } from "../../interface";
import { onSubmit, shoesInitialValues } from "../../service/formik";
import { schemas } from "../../service/schema";
import { MyDialog } from "../modal";
import { Select, FormikTextInput, SubmitButton, Table } from "./";

export const AddShoe = () => {
  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DeleteByID>({
    id: "",
    name: "",
    type: "SHOE",
  });

  const selectStiffnessData = Object.keys(StiffnessType).map((item) => {
    return {
      value: item,
      name: item.toLocaleLowerCase(),
    };
  });

  const {
    rubbersData,
    isError: isRubberError,
    isLoading: isRubberLoading,
  } = useRubbers();

  const {
    brandsData,
    isError: isBrandsError,
    isLoading: isBrandsLoading,
  } = useBrands();

  const {
    shoesData,
    isError: isShoesError,
    isLoading: isShoesLoading,
    mutate,
  } = useShoes();

  if (isRubberError || isBrandsError || isShoesError)
    return (
      <p className="text-olive-50 text-center w-full">
        server error please try again...
      </p>
    );

  if (isRubberLoading || isBrandsLoading || isShoesLoading)
    return <p className="text-olive-50 text-center w-full">loading...</p>;

  if (rubbersData && brandsData && shoesData)
    return (
      <div className="w-full max-w-sm">
        <MyDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          mutate={mutate}
        />

        <Formik
          initialValues={shoesInitialValues}
          validationSchema={schemas.shoe(
            shoesData.shoes,
            rubbersData.rubbers,
            brandsData.brands
          )}
          onSubmit={async (values, formikHelpers) => {
            const res = await onSubmit.addShoe(values, formikHelpers, mutate);
            if (res)
              alert.show(`${res.message}.`, { type: res.type as AlertType });
            else
              alert.show(`Ops, something went wrong.`, {
                type: "error" as AlertType,
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Select
                name="brand"
                data={brandsData.brands.map((brand) => {
                  return { value: brand.id, name: brand.name };
                })}
              />
              <Select
                name="rubber"
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

              <Select
                data={selectLists.rubber_thickness}
                name="rubber thickness"
              />
              <Select data={selectLists.stiffness} name="midsole" />
              <Select data={selectLists.volume} name="volume" />
              <FormikTextInput
                name="description"
                placeholder="Write a brief description..."
                textarea={true}
              />
              <FormikTextInput
                name="image"
                placeholder="Image of shoe URL..."
              />
              <FormikTextInput
                name="url"
                placeholder="URL to more information..."
              />
              <SubmitButton isDisabled={isSubmitting} />
            </Form>
          )}
        </Formik>
        <Table
          name="Shoes"
          setData={setData}
          setIsOpen={setIsOpen}
          type="SHOE"
          data={shoesData.shoes.map((item) => {
            return { id: item.id, name: item.name };
          })}
        />
      </div>
    );
  return (
    <p className="text-olive-50 text-center w-full">
      server error please try again...
    </p>
  );
};
