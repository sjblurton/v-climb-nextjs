import React from "react";
import { ContactForm } from "../components/forms/contact";
import { Layout, Seo } from "../components/shared";

const Contact = () => {
  return (
    <>
      <Seo />
      <Layout>
        <div className="flex items-center justify-center h-screen w-full">
          <ContactForm />
        </div>
      </Layout>
    </>
  );
};

export default Contact;
