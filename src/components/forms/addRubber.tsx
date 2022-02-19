import { Formik, Form } from "formik";
import { useState } from "react";
import { AlertType, useAlert } from "react-alert";
import { useBrands, useRubbers } from "../../hooks/custom";
import { DeleteByID } from "../../interface";
import { onSubmit, rubberInitialValues } from "../../service/formik";
import { schemas } from "../../service/schema";
import { MyDialog } from "../modal";
import { SubmitButton, Table } from "./";
import { RubberInputs } from "./rubber";

export const AddRubber = () => {
  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DeleteByID>({
    id: "",
    name: "",
    type: "RUBBER",
  });

  const {
    rubbersData,
    isError: isRubberError,
    isLoading: isRubberLoading,
    mutate,
  } = useRubbers();

  const {
    brandsData,
    isError: isBrandsError,
    isLoading: isBrandsLoading,
  } = useBrands();

  if (isRubberError || isBrandsError)
    return (
      <p className="text-olive-50 text-center w-full">
        server error please try again...
      </p>
    );

  if (isRubberLoading || isBrandsLoading)
    return <p className="text-olive-50 text-center w-full">loading...</p>;

  if (rubbersData && brandsData)
    return (
      <div className="w-full max-w-sm m-auto">
        <MyDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={data}
          mutate={mutate}
        />

        <Formik
          initialValues={rubberInitialValues}
          validationSchema={schemas.rubber(
            rubbersData.rubbers,
            brandsData.brands
          )}
          onSubmit={async (values, formikHelpers) => {
            const res = await onSubmit.addRubber(values, formikHelpers, mutate);
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
              <RubberInputs />
              <SubmitButton isDisabled={isSubmitting}>Add</SubmitButton>
            </Form>
          )}
        </Formik>
        <Table
          name="Rubber"
          setData={setData}
          setIsOpen={setIsOpen}
          data={rubbersData.rubbers.map((item) => {
            return { id: item.id, name: item.name, type: "RUBBER" };
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
