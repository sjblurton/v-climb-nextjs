import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { GoBack } from "../assets/icons";
import { Features, SimilarTo } from "../components/product";
import { VeganImage, Layout, Seo, Message } from "../components/shared";
import { priceConverter, veganToString } from "../helper/helper";
import { stringifyTheDates } from "../helper/stringify";
import { useBrands, useRubbers, useShoeQuery, useShoes } from "../hooks/custom";
import {
  RubberWithStringDates,
  ShoeWithStringDates,
  TFeatures,
} from "../interface";
import prisma from "../lib/prisma";
import { axiosGet } from "../service/axios";

const Product: NextPage = () => {
  const [query, setQuery] = useState<ParsedUrlQuery | undefined>(undefined);
  const [similarShoes, setSimilarShoes] = useState<
    ShoeWithStringDates[] | undefined
  >(undefined);
  const router = useRouter();
  const { shoesData, isError } = useShoes(router.query.slug as string);
  const { brandsData } = useBrands(shoesData?.shoes[0].brandId);
  const { rubbersData } = useRubbers(shoesData?.shoes[0].rubberId);

  useEffect(() => {
    const getSimilar = async () => {
      const shoes = await axiosGet.getShoes(query);
      if (shoes.shoes)
        setSimilarShoes(
          shoes.shoes.filter((shoe) => shoe.slug !== shoesData?.shoes[0].slug)
        );
    };

    if (query) getSimilar();
  }, [query]);

  useEffect(() => {
    if (shoesData) {
      const { asymmetry, profile, midsole } = shoesData.shoes[0];
      setQuery({ midsole, profile, asymmetry });
    }
  }, [shoesData]);

  if (isError) {
    return (
      <>
        <Message>Ops... Something went wrong.</Message>
      </>
    );
  }

  if (shoesData && brandsData && rubbersData) {
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
    } = shoesData?.shoes[0];

    const shoeBrand = brandsData.brands[0].name;

    const rubber = rubbersData.rubbers[0];

    const templateTitle = `${shoeName} climbing shoe by ${shoeBrand} are ${veganToString(
      veganType
    )}`;

    const array = [
      { title: "profile" as TFeatures, value: profile },
      { title: "midsole" as TFeatures, value: midsole },
      { title: "rubber" as TFeatures, value: rubber_thickness },
      { title: "asymmetry" as TFeatures, value: asymmetry },
      { title: "volume" as TFeatures, value: volume },
      {
        title: "rubberBrand" as TFeatures,
        value: rubber.image,
        rubber: rubber,
      },
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
                className="flex-auto m-auto rounded bg-slate-50"
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
  return (
    <>
      <Message>Loading...</Message>
    </>
  );
};

export default Product;

// export const getStaticPaths: GetStaticPaths = async () => {
//   const shoes = await prisma.shoes.findMany({
//     select: { slug: true },
//   });
//   const paths = shoes.map((shoe) => {
//     return { params: { slug: shoe.slug } };
//   });
//   return {
//     paths,
//     fallback: true,
//   };
// };

// interface IParams extends ParsedUrlQuery {
//   slug: string;
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const { slug } = context.params as IParams;

//   let props = {};

//   const shoe = await prisma.shoes.findUnique({ where: { slug } });

//   if (shoe) {
//     const shoesDatesAsStrings = stringifyTheDates([
//       shoe,
//     ]) as ShoeWithStringDates[];

//     const brand = await prisma.brand.findUnique({
//       where: { id: shoe.brandId },
//       select: { name: true },
//     });

//     const rubber = await prisma.rubber.findUnique({
//       where: { id: shoe.rubberId },
//     });

//     if (rubber) {
//       const rubbersDatesAsStrings = stringifyTheDates([
//         rubber,
//       ]) as RubberWithStringDates[];

//       props = { ...props, rubber: rubbersDatesAsStrings[0] };

//       const rubberBrandRes = await prisma.brand.findUnique({
//         where: { id: rubber.brandId },
//         select: { name: true },
//       });

// const rubbersWithSameStiffness = await prisma.rubber.findMany({
//   where: { stiffness: rubber.stiffness },
//   select: { id: true },
// });

// const similarShoes =
//   rubbersWithSameStiffness &&
//   (await prisma.shoes.findMany({
//     where: {
//       midsole: shoe.midsole,
//       profile: shoe.profile,
//       asymmetry: shoe.asymmetry,
//       rubberId: {
//         in: [...rubbersWithSameStiffness.map((item) => item.id)],
//       },
//     },
//   }));
// const shoesDatesAsStrings = stringifyTheDates([
//   ...similarShoes,
// ]) as ShoeWithStringDates[];

//       props = {
//         ...props,
//         rubberBrand: rubberBrandRes?.name,
//         // similar: shoesDatesAsStrings.filter((item) => item.id !== shoe.id),
//       };
//     }

//     props = {
//       ...props,
//       shoe: shoesDatesAsStrings[0],
//       shoeBrand: brand?.name,
//     };
//   }

//   return { props, revalidate: 1000 };
// };
