import { GetStaticPropsContext, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useContext, useEffect, useState } from "react";
import { GoBack } from "../assets/icons";
import { Features, SimilarTo } from "../components/product";
import { VeganImage, Layout, Seo, Message } from "../components/shared";
import { FilterContext } from "../context/context";
import { priceConverter, veganToString } from "../helper/main";
import { useInitState } from "../hooks/custom";
import { ShoeWithStringDates, TFeatures } from "../interface";
import prisma from "../lib/prisma";
import { axiosGet } from "../service/axios";

type Props = {
  slug: string;
};

const Product: NextPage<Props> = ({ slug }) => {
  const { state } = useContext(FilterContext);
  const router = useRouter();
  useInitState({});
  const [shoe, setShoe] = useState<ShoeWithStringDates | undefined>(
    state.shoes.filter((shoe) => shoe.slug === slug)[0] || undefined
  );
  const [query, setQuery] = useState<ParsedUrlQuery | undefined>(undefined);
  const [similarShoes, setSimilarShoes] = useState<
    ShoeWithStringDates[] | undefined
  >(undefined);

  useEffect(() => {
    if (
      state.shoes.length > 0 &&
      state.brands.length > 0 &&
      state.rubbers.length > 0
    ) {
      setShoe(state.shoes.filter((shoe) => shoe.slug === slug)[0]);
    }
  }, [state.shoes, state.brands, state.rubbers, slug]);

  useEffect(() => {
    if (shoe) {
      const { asymmetry, profile, midsole } = shoe;
      setQuery({
        midsole,
        profile,
        asymmetry,
        veganType: ["VEGAN", "POSSIBLY"],
      });
    }
  }, [shoe]);

  useEffect(() => {
    const getSimilar = async () => {
      const shoes = await axiosGet.getShoes(query);
      if (shoes.shoes)
        setSimilarShoes(
          shoes.shoes.filter((shoe) => shoe.slug !== router.query.slug) || []
        );
    };

    if (query) getSimilar();
  }, [query]); // eslint-disable-line

  if (router.isFallback) {
    return <Message>Loading...</Message>;
  }

  if (shoe) {
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
      brandId,
      rubberId,
    } = shoe;

    const shoeBrand = state.brands.filter((brand) => brand.id === brandId)[0]
      .name;

    const array = [
      { title: "profile" as TFeatures, value: profile },
      { title: "midsole" as TFeatures, value: midsole },
      { title: "rubber" as TFeatures, value: rubber_thickness },
      { title: "asymmetry" as TFeatures, value: asymmetry },
      { title: "volume" as TFeatures, value: volume },
      {
        title: "rubberBrand" as TFeatures,
        value: state.rubbers.filter((item) => item.id === rubberId)[0].image,
        rubber: state.rubbers.filter((item) => item.id === rubberId)[0],
      },
    ];

    const templateTitle = `VCLIMB | ${shoeName} climbing shoe by ${shoeBrand} are ${veganToString(
      veganType
    )}`;

    const metaDescription = `${shoeName} climbing shoe by ${shoeBrand} are ${veganToString(
      veganType
    )}, they have a ${midsole.toLocaleLowerCase()} midsole, a ${profile.toLocaleLowerCase()} profile, and a ${asymmetry.toLocaleLowerCase()} asymmetry.`;

    return (
      <>
        <Seo templateTitle={templateTitle} description={metaDescription} />
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
              <div className="relative w-[80vw] h-[80vw] max-h-96 max-w-96 mx-auto">
                <Image
                  layout={"fill"}
                  objectFit={"contain"}
                  src={image}
                  alt={`${veganToString(
                    veganType
                  )} - ${shoeBrand} - ${shoeName}`}
                  className="flex-auto m-auto rounded bg-slate-50"
                />
              </div>

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
            {similarShoes && similarShoes.length > 0 && (
              <SimilarTo
                shoes={similarShoes}
                brand={shoeBrand}
                name={shoeName}
              />
            )}
          </div>
        </Layout>
      </>
    );
  }

  const templateTitle = `VCLIMB | vegan ${slug.replace(
    "-",
    " "
  )} climbing shoes`;
  return (
    <>
      <Seo templateTitle={templateTitle} />
      <Layout>
        <Message>Loading...</Message>
      </Layout>
    </>
  );
};

export default Product;

export async function getStaticPaths() {
  const params = await prisma.shoes.findMany({
    select: { slug: true },
  });

  return {
    paths: params.map((item) => {
      return { params: { slug: item.slug } };
    }),

    fallback: true,
  };
}

type Params = {
  slug: string;
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<Params>) {
  return {
    props: { slug: params?.slug },
    revalidate: 1000,
  };
}
