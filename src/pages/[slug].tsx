import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { GoBack } from "../assets/icons";
import { Features } from "../components";
import { VeganImage, Layout, Seo } from "../components/shared";
import { priceConverter, veganToString } from "../helper/helper";
import {
  RubberWithStringDates,
  ShoeWithStringDates,
  TFeatures,
} from "../interface";
import { axiosGet } from "../service/axios";

type Props = {
  shoe: ShoeWithStringDates;
  rubber: RubberWithStringDates;
  shoeBrand: string;
  rubberBrand: string;
};

const Product: NextPage<Props> = ({ shoe, rubber, rubberBrand, shoeBrand }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Layout>
          <h3 className="w-full text-xl text-slate-50 text-center">
            Loading...
          </h3>
        </Layout>
      </>
    );
  }

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
    updatedAt,
    url,
  } = shoe;

  const templateTitle = `${shoeName} climbing shoe by ${shoeBrand} are ${veganToString(
    veganType
  )}`;

  const array = [
    { title: "profile" as TFeatures, value: profile },
    { title: "midsole" as TFeatures, value: midsole },
    { title: "rubber" as TFeatures, value: rubber_thickness },
    { title: "asymmetry" as TFeatures, value: asymmetry },
    { title: "volume" as TFeatures, value: volume },
    { title: "rubberBrand" as TFeatures, value: rubber.image, rubber: rubber },
  ];

  return (
    <>
      <Seo templateTitle={templateTitle} />
      <Layout>
        <div className="container max-w-5xl mx-auto my-4">
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
          <div className="container">
            <p className="p-3 text-olive-50 text-sm font-bold">
              Up-to-date as of the {updatedAt}
            </p>
          </div>
          <a href={url} target="_blank" rel="noreferrer">
            <button className="btn btn-olive">more info</button>
          </a>
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
  const response = await axiosGet.getShoes();
  const paths =
    // @ts-ignore
    response.shoes.map((shoe) => {
      return { params: { slug: shoe.slug } };
    });
  return {
    paths,
    fallback: true,
  };
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  let props = {};
  const shoeRes = await axiosGet.getShoeBySlug(slug);

  if (shoeRes.shoe) {
    const brandRes = await axiosGet.getBrandById(shoeRes.shoe.brandId);

    const rubberRes = await axiosGet.getRubberById(shoeRes.shoe.rubberId);

    const rubberBrandRes = rubberRes.rubber
      ? await axiosGet.getBrandById(rubberRes.rubber?.brandId)
      : { brandName: "" };

    props = {
      ...props,
      ...shoeRes,
      ...rubberRes,
      shoeBrand: brandRes.brandName,
      rubberBrand: rubberBrandRes.brandName,
    };
  }
  return { props, revalidate: 600 };
};
