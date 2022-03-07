import { GetStaticProps } from "next";
import { SWRConfig } from "swr";
import { Filters, SearchBar } from "../components/home";
import { ShoeGrid } from "../components/home";
import { Layout, Seo } from "../components/shared";
import { stringifyTheDates } from "../helper/stringify";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";
import prisma from "../lib/prisma";

interface Props {
  fallback: {
    "/api/v1/shoes": ShoeWithStringDates[];
    "/api/v1/brands": RubberWithStringDates[];
    "/api/v1/rubbers": BrandWithStringDates[];
  };
}

const Home = ({ fallback }: Props) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Seo />
      <Layout>
        <article className="px-2 my-6 max-w-lg mx-auto flex flex-col gap-y-3">
          <h1 className="text-6xl text-slate-50 font-bold">V-CLIMB</h1>
          <h3 className="text-3xl text-slate-100">Vegan Rock Climbing Shoes</h3>
          <p className="text-slate-200">
            Trying to select the most ethical, environmentally friendly, cruelty
            free shoes for climbing while also not sacrificing the performance
            of our climbing can be tricky. Here at V-Climb we have done the hard
            work for you with all the confirmed vegan rock climbing shoes in one
            place to help you make the best choice easier for you, the planet,
            and the animals.
          </p>
          <SearchBar />
        </article>
        <div className="grid grid-cols-1 px-1 sm:grid-cols-12 gap-2">
          <div className="sm:col-span-4 md:col-span-3 lg:col-span-2">
            <Filters />
          </div>
          <ShoeGrid />
        </div>
      </Layout>
    </SWRConfig>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const brands = await prisma.brand.findMany();
  const rubbers = await prisma.rubber.findMany();
  const shoes = await prisma.shoes.findMany({ take: 80 });

  const shoesDatesAsStrings = stringifyTheDates(shoes) as ShoeWithStringDates[];
  const brandsDatesAsStrings = stringifyTheDates(
    brands
  ) as BrandWithStringDates[];
  const rubbersDatesAsStrings = stringifyTheDates(
    rubbers
  ) as RubberWithStringDates[];

  const props = {
    fallback: {
      "/api/v1/shoes": shoesDatesAsStrings,
      "/api/v1/brands": brandsDatesAsStrings,
      "/api/v1/rubbers": rubbersDatesAsStrings,
    },
  };

  return { props: props, revalidate: 1000 };
};
