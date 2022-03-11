import { Formik, Form } from "formik";
import { useState } from "react";
import { AlertType, useAlert } from "react-alert";
import { useBrands, useRubbers, useShoes } from "../../hooks/custom";
import { DeleteByID } from "../../interface";
import { onSubmit, shoesInitialValues } from "../../service/formik";
import { schemas } from "../../service/schema";
import { SubmitButton, Table, ShoeInputs, DeleteModal } from "./";

export const AddShoe = () => {
  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DeleteByID>({
    id: "",
    name: "",
    type: "SHOE",
    slug: "",
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
      <div className="w-full max-w-sm m-auto">
        <DeleteModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          mutate={mutate}
        />

        <Formik
          initialValues={shoesInitialValues}
          validationSchema={schemas.shoe(
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
              <ShoeInputs />
              <SubmitButton isDisabled={isSubmitting}>Add</SubmitButton>
            </Form>
          )}
        </Formik>
        <Table
          name="Shoes"
          setData={setData}
          setIsOpen={setIsOpen}
          data={shoesData.shoes
            .sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
            .map((item) => {
              return {
                id: item.id,
                name: item.name,
                slug: item.slug,
                type: "SHOE",
              };
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
