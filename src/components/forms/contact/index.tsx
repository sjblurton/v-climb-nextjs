import { Form, Formik } from "formik";
import React from "react";
import { contactInitialValues } from "../../../service/formik";
import { schemas } from "../../../service/schema";
import { SubmitButton } from "../submitButton";
import { FormikTextInput } from "../textInput";

type Props = {};

export const ContactForm = () => {
  return (
    <div className="w-full max-w-sm m-auto">
      <Formik
        initialValues={contactInitialValues}
        validationSchema={schemas.contact}
        onSubmit={async (values, formikHelpers) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormikTextInput name="name" placeholder="Your Name..." />
            <FormikTextInput name="email" placeholder="Your Email..." />
            <FormikTextInput
              textarea={true}
              name="message"
              placeholder="Your Message..."
            />

            <SubmitButton isDisabled={isSubmitting}>Submit</SubmitButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};
