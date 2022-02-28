import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { AlertType, useAlert } from "react-alert";
import { Layout, Message } from "../../../components/shared";
import { SubmitButton } from "../../../components/forms";
import { ShoeInputs } from "../../../components/forms/shoe";
import { useBrands, useRubbers, useShoes } from "../../../hooks/custom";
import { ShoePostInput } from "../../../interface";
import { onSubmit } from "../../../service/formik";
import { schemas } from "../../../service/schema";

const ShoeEditor = () => {
  const alert = useAlert();
  const { query, push } = useRouter();
  const id = typeof query.id === "string" ? query.id : "";

  const {
    brandsData,
    isError: brandError,
    isLoading: brandLoading,
  } = useBrands();
  const { rubbersData, isError, isLoading } = useRubbers();
  const { shoesData, mutate } = useShoes();

  if (isLoading || brandLoading) return <Message>Loading...</Message>;

  if (isError || brandError)
    return <Message>Ops, something went wrong...</Message>;

  if (brandsData && rubbersData && shoesData) {
    const shoe = shoesData.shoes.filter((shoe) => shoe.slug === id)[0];
    const initialValues: ShoePostInput = {
      rubberId: shoe.rubberId,
      brandId: shoe.brandId,
      name: shoe.name,
      slug: shoe.slug,
      veganType: shoe.veganType,
      price: shoe.price,
      volume: shoe.volume,
      closure: shoe.closure,
      hooking: shoe.hooking,
      asymmetry: shoe.asymmetry,
      profile: shoe.profile,
      "rubber thickness": shoe.rubber_thickness,
      midsole: shoe.midsole,
      "ankle protection": shoe.ankle_protection === true ? "YES" : "NO",
      description: shoe.description,
      url: shoe.url,
      image: shoe.image,
      ankle_protection: shoe.ankle_protection,
      rubber_thickness: shoe.rubber_thickness,
    };

    return (
      <>
        <Layout>
          <div className="w-full max-w-sm my-4 mx-auto flex align-middle flex-col justify-center">
            <Formik
              initialValues={initialValues}
              validationSchema={schemas.shoe(
                rubbersData.rubbers,
                brandsData.brands
              )}
              onSubmit={async (values, formikHelpers) => {
                const res = await onSubmit.updateShoe(
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
                  <ShoeInputs />
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

export default ShoeEditor;
