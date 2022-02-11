import { Rubber, Shoes } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { GoBack } from "../assets/icons";
import { Features, Layout, Seo } from "../components";
import { priceConverter, veganToString } from "../helper/helper";
import { getProps } from "../service/getProps";

type Props = {
  shoe: Shoes;
  rubber: Rubber;
  shoeBrand: string;
  rubberBrand: string;
};

const Product: NextPage<Props> = ({ shoe, rubber, shoeBrand, rubberBrand }) => {
  const {
    name: shoeName,
    veganType,
    image,
    price,
    description,
    midsole,
    profile,
    rubber_thickness,
    asymmetry,
    volume,
  } = shoe;

  const templateTitle = `The ${shoeName} climbing shoes by ${shoeBrand} are ${veganToString(
    veganType
  )}`;

  const array = [
    { title: "profile", value: profile },
    { title: "midsole", value: midsole },
    { title: "rubber", value: rubber_thickness },
    { title: "asymmetry", value: asymmetry },
    { title: "volume", value: volume },
  ];
  return (
    <>
      <Seo templateTitle={templateTitle} />
      <Layout>
        <div className="container">
          <div className="flex items-center justify-between p-3">
            <h2 className="text-olive-50 capitalize text-4xl text-center">
              <span className="font-bold">{shoeBrand}</span> - {shoeName}{" "}
            </h2>
            <div>
              <GoBack />
            </div>
          </div>
          <Image
            width={500}
            height={500}
            layout="intrinsic"
            src={image}
            alt={`${veganToString(veganType)} - ${shoeBrand} - ${shoeName}`}
          />
          <h3 className="p-3 text-olive-50 capitalize text-3xl font-bold">
            Price: {priceConverter(price)}
          </h3>
          <Features values={array} />
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
