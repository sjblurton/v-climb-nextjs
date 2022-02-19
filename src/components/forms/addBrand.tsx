import { Formik, Form } from "formik";
import { useState } from "react";
import { AlertType, useAlert } from "react-alert";
import { useBrands } from "../../hooks/custom";
import { DeleteByID } from "../../interface";
import { brandInitialValues, onSubmit } from "../../service/formik";
import { schemas } from "../../service/schema";
import { MyDialog } from "../modal";
import { FormikTextInput, SubmitButton, Table } from "./";

export const AddBrand = () => {
  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DeleteByID>({
    id: "",
    name: "",
    type: "BRAND",
  });
  const { brandsData, isError, mutate, isLoading } = useBrands();

  if (isError)
    return <p className="text-olive-50 text-center w-full">{isError}</p>;

  if (isLoading)
    return <p className="text-olive-50 text-center w-full">Loading...</p>;

  if (brandsData) {
    return (
      <div className="w-full max-w-sm m-auto">
        <MyDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          mutate={mutate}
        />
        <Formik
          initialValues={brandInitialValues}
          validationSchema={schemas.brand(brandsData.brands)}
          onSubmit={async (values, formikHelpers) => {
            const res = await onSubmit.addBrand(values, formikHelpers, mutate);
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
              <FormikTextInput name="name" placeholder="Add a new brand..." />
              <SubmitButton isDisabled={isSubmitting}>Add</SubmitButton>
            </Form>
          )}
        </Formik>
        <Table
          name="Brands"
          data={brandsData.brands.map((item) => {
            return { id: item.id, name: item.name, type: "BRAND" };
          })}
          setIsOpen={setIsOpen}
          setData={setData}
        />
      </div>
    );
  }
  return (
    <p className="text-olive-50 text-center w-full">
      server error please try again...
    </p>
  );
};
