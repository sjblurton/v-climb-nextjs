import { GetStaticProps } from "next";
import { useContext, useEffect } from "react";
import { Filters, SearchBar } from "../components/home";
import { ShoeGrid } from "../components/home";
import { Layout, Seo } from "../components/shared";
import { FilterContext } from "../context/context";
import { stringifyTheDates } from "../helper/stringify";
import { useRubbers } from "../hooks/custom";
import { BrandWithStringDates, ShoeWithStringDates } from "../interface";
import prisma from "../lib/prisma";
import { ActionType } from "../reducer/actions";

interface Props {
  shoes: ShoeWithStringDates[];
  brands: BrandWithStringDates[];
  numberOfShoes: number;
}

const Home = ({ shoes, brands, numberOfShoes }: Props) => {
  const { dispatch, state } = useContext(FilterContext);
  const { rubbersData } = useRubbers();

  useEffect(() => {
    if (state.shoes.length === 0)
      dispatch({
        type: ActionType.InitShoeData,
        payload: shoes,
      });
    dispatch({
      type: ActionType.InitBrandData,
      payload: brands,
    });
  }, []); //eslint-disable-line

  useEffect(() => {
    if (rubbersData) {
      if (state.brands.length === 0) {
        dispatch({
          type: ActionType.InitRubberData,
          payload: rubbersData.rubbers,
        });
      }
    }
  }, [rubbersData]); //eslint-disable-line

  return (
    <>
      <Seo />
      <Layout>
        <article className="px-2 my-6 max-w-lg mx-auto flex flex-col gap-y-3">
          <h1 className="text-6xl text-slate-50 font-bold">VCLIMB</h1>
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
          <p className="text-slate-200">
            showing {state.filteredShoes.length} shoes of {numberOfShoes}
          </p>
        </article>
        <div className="grid grid-cols-1 px-1 sm:grid-cols-12 gap-2">
          <div className="sm:col-span-4 md:col-span-3 lg:col-span-2">
            <div></div>
            <Filters />
          </div>
          <ShoeGrid />
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
  const shoes = await prisma.shoes.findMany({ take: 80 });

  const shoesDatesAsStrings = stringifyTheDates(shoes) as ShoeWithStringDates[];
  const brandsDatesAsStrings = stringifyTheDates(
    brands
  ) as BrandWithStringDates[];

  const props = {
    shoes: shoesDatesAsStrings,
    brands: brandsDatesAsStrings,
    numberOfShoes,
  };

  return { props, revalidate: 1000 };
};
