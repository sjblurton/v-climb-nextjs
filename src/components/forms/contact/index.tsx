import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import { contactInitialValues } from "../../../service/formik";
import { schemas } from "../../../service/schema";
import { SubmitButton } from "../submitButton";
import { FormikTextInput } from "../textInput";
import { AlertType, useAlert } from "react-alert";

export const ContactForm = () => {
  const alert = useAlert();
  return (
    <div className="w-full max-w-sm m-auto">
      <Formik
        initialValues={contactInitialValues}
        validationSchema={schemas.contact}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          setSubmitting(true);
          try {
            const res = await axios({
              method: "POST",
              url: "https://formspree.io/f/xoqrljdr",
              data: values,
            });
            alert.show(`Thank you ${values.name}, your message was sent.`, {
              type: "success",
            });
            setSubmitting(false);
            resetForm();
          } catch (error) {
            console.log(error);
            alert.show(`Oops... Something when wrong. Please try again.`, {
              type: "error",
            });
            setSubmitting(false);
          }
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
