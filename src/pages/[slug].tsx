import { Rubber, Shoes } from "@prisma/client";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import { GoBack } from "../assets/icons";
import { Features, Layout, RubberData, Seo } from "../components";
import { VeganImage } from "../components/";
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

  const templateTitle = `${shoeName} climbing shoe by ${shoeBrand} are ${veganToString(
    veganType
  )}`;

  const array = [
    { title: "profile", value: profile },
    { title: "midsole", value: midsole },
    { title: "rubber", value: rubber_thickness },
    { title: "asymmetry", value: asymmetry },
    { title: "volume", value: volume },
    { title: rubber.name, value: rubber.image },
  ];

  shoe;

  return (
    <>
      <Seo templateTitle={templateTitle} />
      <Layout>
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center justify-between p-3">
            <h2 className="text-olive-50 capitalize text-4xl text-center">
              <span className="font-bold">{shoeBrand}</span> - {shoeName}{" "}
            </h2>
            <div className="cursor-pointer">
              <GoBack />
            </div>
          </div>
          <div className="relative flex flex-col md:flex-row justify-center">
            <Image
              width={500}
              height={500}
              layout="intrinsic"
              src={image}
              alt={`${veganToString(veganType)} - ${shoeBrand} - ${shoeName}`}
            />

            {veganType && (
              <div className="absolute left-4 top-4">
                {VeganImage(veganType)}
              </div>
            )}

            <p className="mx-auto p-3 text-olive-50 text-base max-w-lg">
              {description}
            </p>
          </div>
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
