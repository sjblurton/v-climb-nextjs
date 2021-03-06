import { GetStaticProps } from "next";
import { useContext } from "react";
import { Filters, SearchBar } from "../components/home";
import { ShoeGrid } from "../components/home";
import { Layout, Seo } from "../components/shared";
import { FilterContext } from "../context/context";
import { stringifyTheDates } from "../helper/stringify";
import { useInitState } from "../hooks/custom";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";
import prisma from "../lib/prisma";

interface Props {
  shoes: ShoeWithStringDates[];
  brands: BrandWithStringDates[];
  rubbers: RubberWithStringDates[];
  numberOfShoes: number;
}

const Home = ({ shoes, brands, numberOfShoes, rubbers }: Props) => {
  const { state } = useContext(FilterContext);
  useInitState({ shoes, brands, rubbers });

  return (
    <>
      <Seo />
      <Layout>
        <article className="px-2 my-6 max-w-lg mx-auto flex flex-col gap-y-3">
          <h1 className="text-6xl text-slate-50 font-bold">VCLIMB</h1>
          <h2 className="text-3xl text-slate-100">Vegan Rock Climbing Shoes</h2>
          <p className="text-slate-200">
            Trying to select the most ethical, environmentally friendly, cruelty
            free shoes for climbing while also not sacrificing the performance
            of our climbing can be tricky. Here at VClimb we have done the hard
            work for you with all the confirmed vegan rock climbing shoes in one
            place to help you make the best choice easier for you, the planet,
            and the animals.
          </p>
          <SearchBar />
          <p className="text-slate-200">
            showing {state.filteredShoes.length} shoes of {numberOfShoes}
          </p>
        </article>
        <div className="grid grid-cols-1 px-1 sm:grid-cols-12 gap-2">
          <div className="sm:col-span-4 md:col-span-3 lg:col-span-2">
            <div></div>
            <Filters shoes={shoes} brands={brands} rubbers={rubbers} />
          </div>
          <ShoeGrid shoes={shoes} brands={brands} />
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const brands = await prisma.brand.findMany();
  const numberOfShoes = (await prisma.shoes.findMany({ select: { id: true } }))
    .length;
  const shoes = await prisma.shoes.findMany({ take: 50 });
  const rubbers = await prisma.rubber.findMany();
  const shoesDatesAsStrings = stringifyTheDates(shoes) as ShoeWithStringDates[];
  const brandsDatesAsStrings = stringifyTheDates(
    brands
  ) as BrandWithStringDates[];
  const rubbersDatesAsStrings = stringifyTheDates(
    rubbers
  ) as RubberWithStringDates[];

  const props = {
    shoes: shoesDatesAsStrings,
    brands: brandsDatesAsStrings,
    rubbers: rubbersDatesAsStrings,
    numberOfShoes,
  };

  return { props, revalidate: 1000 };
};
