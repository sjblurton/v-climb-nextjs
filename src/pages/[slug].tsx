import { Rubber, Shoes } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Layout, Seo } from "../components";
import { getProps } from "../service/getProps";

type Props = {
  shoe: Shoes;
  rubber: Rubber;
  shoeBrand: string;
  rubberBrand: string;
};

const Product: NextPage<Props> = ({ shoe, rubber, shoeBrand, rubberBrand }) => {
  const templateTitle = ``;
  return (
    <>
      <Seo templateTitle={`hello`} />
      <Layout>
        <>{JSON.stringify(shoe)}</>
      </Layout>
    </>
  );
};

export default Product;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getProps.getShoePaths();

  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const props = await getProps.getSinglePageData(slug);
  return { props };
};
