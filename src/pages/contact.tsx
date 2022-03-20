import React from "react";
import { ContactForm } from "../components/forms/contact";
import { Layout, Seo } from "../components/shared";

const Contact = () => {
  return (
    <>
      <Seo
        templateTitle="VCLIMB | Contact us."
        description="Contact us if you have any questions, or if you believe any of the data to be wrong."
      />
      <Layout>
        <div className="flex items-center justify-center h-screen w-full">
          <ContactForm />
        </div>
      </Layout>
    </>
  );
};

export default Contact;
