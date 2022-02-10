import { Rubber, Shoes } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { Layout, Seo } from "../components";
import { priceConverter, veganToString } from "../helper/helper";
import { getProps } from "../service/getProps";

type Props = {
  shoe: Shoes;
  rubber: Rubber;
  shoeBrand: string;
  rubberBrand: string;
};

const Product: NextPage<Props> = ({ shoe, rubber, shoeBrand, rubberBrand }) => {
  const { name: shoeName, veganType, image, price } = shoe;
  const templateTitle = `The ${shoeName} climbing shoes by ${shoeBrand} are ${veganToString(
    veganType
  )}`;
  return (
    <>
      <Seo templateTitle={templateTitle} />
      <Layout>
        <div className="container">
          <h2 className="m-3 text-olive-50 capitalize text-4xl font-bold text-center">
            {shoeBrand} - {shoeName}
          </h2>
          <Image
            width={500}
            height={500}
            layout="intrinsic"
            src={image}
            alt={`${veganToString(veganType)} - ${shoeBrand} - ${shoeName}`}
          />
          <h3 className="m-3 text-olive-50 capitalize text-3xl font-bold">
            Price: {priceConverter(price)}
          </h3>
        </div>
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
