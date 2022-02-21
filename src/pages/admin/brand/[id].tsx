import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { AlertType, useAlert } from "react-alert";
import { Layout, Message } from "../../../components";
import { FormikTextInput, SubmitButton } from "../../../components/forms";
import { useBrands } from "../../../hooks/custom";
import { onSubmit } from "../../../service/formik";
import { schemas } from "../../../service/schema";

type Props = {};

const BrandEditor = (props: Props) => {
  const alert = useAlert();
  const { query, push } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";

  const { brandsData, isError, isLoading, mutate } = useBrands();

  if (isLoading) return <Message>Loading...</Message>;

  if (isError) return <Message>Ops, something went wrong...</Message>;

  if (brandsData) {
    const brand = brandsData.brands.filter((brand) => brand.id === id)[0];
    const initialValues = { name: brand.name };

    return (
      <>
        <Layout>
          <div className="w-full max-w-sm m-auto h-screen flex align-middle flex-col justify-center">
            <Formik
              initialValues={initialValues}
              validationSchema={schemas.brand(brandsData.brands)}
              onSubmit={async (values, formikHelpers) => {
                const res = await onSubmit.updateBrand(
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
                  <FormikTextInput
                    name="name"
                    placeholder="Add a new brand..."
                  />
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
        </Layout>
      </>
    );
  }
};

export default BrandEditor;
