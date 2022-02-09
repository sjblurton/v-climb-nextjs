import { useRouter } from "next/router";
import React from "react";
import { Layout, Seo } from "../../../components";

type Props = {};

const Product = (props: Props) => {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <Seo templateTitle={`hello`} />
      <Layout>
        <></>
      </Layout>
    </>
  );
};

export default Product;
