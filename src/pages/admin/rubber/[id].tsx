import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { AlertType, useAlert } from "react-alert";
import { Layout, Message } from "../../../components/shared";
import { SubmitButton } from "../../../components/forms";
import { RubberInputs } from "../../../components/forms/rubber";
import { useBrands, useRubbers } from "../../../hooks/custom";
import { onSubmit } from "../../../service/formik";
import { schemas } from "../../../service/schema";

const RubberEditor = () => {
  const alert = useAlert();
  const { query, push } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";

  const {
    brandsData,
    isError: brandError,
    isLoading: brandLoading,
  } = useBrands();
  const { rubbersData, isError, isLoading, mutate } = useRubbers();

  if (isLoading || brandLoading) return <Message>Loading...</Message>;

  if (isError || brandError)
    return <Message>Ops, something went wrong...</Message>;

  if (brandsData && rubbersData) {
    const rubber =
      rubbersData.rubbers.filter((rubber) => rubber.id === id)[0] ||
      "not found";
    const initialValues = {
      name: rubber.name,
      stiffness: rubber.stiffness,
      brandId: rubber.brandId,
      description: rubber.description,
      image: rubber.image,
    };

    return (
      <>
        <Layout>
          <div className="w-full max-w-sm m-auto h-screen flex align-middle flex-col justify-center">
            <Formik
              initialValues={initialValues}
              validationSchema={schemas.brand(brandsData.brands)}
              onSubmit={async (values, formikHelpers) => {
                const res = await onSubmit.updateRubber(
                  id,
                  values,
                  formikHelpers
                );
                mutate();
                if (res)
                  alert.show(`${res.message}.`, {
                    type: res.type as AlertType,
                  });
                else
                  alert.show(`Ops, something went wrong.`, {
                    type: "error" as AlertType,
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <RubberInputs />
                  <SubmitButton isDisabled={isSubmitting}>Edit</SubmitButton>
                  <button
                    className={
                      isSubmitting
                        ? "btn-olive disabled-btn w-full mt-4"
                        : "btn-olive w-full mt-4"
                    }
                    type="button"
                    onClick={() => push("/admin")}
                  >
                    Go Back
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </Layout>{" "}
      </>
    );
  }
};

export default RubberEditor;
