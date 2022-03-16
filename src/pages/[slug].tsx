import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useContext, useEffect, useState } from "react";
import { GoBack } from "../assets/icons";
import { Features, SimilarTo } from "../components/product";
import { VeganImage, Layout, Seo } from "../components/shared";
import { FilterContext } from "../context/context";
import { priceConverter, veganToString } from "../helper/helper";
import { ShoeWithStringDates, TFeatures } from "../interface";
import { axiosGet } from "../service/axios";

const Product: NextPage = () => {
  const { state } = useContext(FilterContext);
  const router = useRouter();
  const shoe = state.shoes.filter((item) => item.slug === router.query.slug)[0];
  const shoeBrand = state.brands.filter((item) => item.id === shoe.brandId)[0]
    .name;
  const rubber = state.rubbers.filter((item) => item.id === shoe.rubberId)[0];
  const [query, setQuery] = useState<ParsedUrlQuery | undefined>(undefined);
  const [similarShoes, setSimilarShoes] = useState<
    ShoeWithStringDates[] | undefined
  >(undefined);

  useEffect(() => {
    const getSimilar = async () => {
      const shoes = await axiosGet.getShoes(query);
      if (shoes.shoes)
        setSimilarShoes(
          shoes.shoes.filter((shoe) => shoe.slug !== router.query.slug)
        );
    };

    if (query) getSimilar();
  }, [query]); // eslint-disable-line

  useEffect(() => {
    const { asymmetry, profile, midsole } = shoe;
    setQuery({
      midsole,
      profile,
      asymmetry,
      veganType: ["VEGAN", "POSSIBLY"],
    });
  }, []); //eslint-disable-line

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
            <SimilarTo shoes={similarShoes} brand={shoeBrand} name={shoeName} />
          )}
        </div>
      </Layout>
    </>
  );
};

export default Product;
