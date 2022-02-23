import { useContext } from "react";
import { Card } from "../components";
import { Filters } from "../components/filters";
import { Layout, Seo } from "../components/shared";
import { FilterContext } from "../context/context";
import { brandNameFromId } from "../helper/stringify";
import {
  BrandWithStringDates,
  RubberWithStringDates,
  ShoeWithStringDates,
} from "../interface";
import { getAllData } from "../service/axios";

interface Props {
  shoes?: ShoeWithStringDates[];
  rubbers?: RubberWithStringDates[];
  brands?: BrandWithStringDates[];
  error?: {
    shoes?: string;
    rubbers?: string;
    brands?: string;
  };
}

const Home = ({ shoes, brands, rubbers, error }: Props) => {
  const { dispatch, state } = useContext(FilterContext);

  const card = (
    data: ShoeWithStringDates[],
    brandData: BrandWithStringDates[]
  ) => {
    return data.map((item) => (
      <Card
        key={item.slug}
        shoe={item}
        brand={brandNameFromId(brandData, item.brandId)}
      />
    ));
  };

  if (shoes && brands && rubbers) {
    return (
      <>
        <Seo />
        <Layout>
          <article className="px-2 my-6 max-w-lg mx-auto flex flex-col gap-y-3">
            <h1 className="text-6xl text-slate-50 font-bold">V-CLIMB</h1>
            <h3 className="text-3xl text-slate-100">
              Vegan Rock Climbing Shoes
            </h3>
            <p className="text-slate-200">
              Trying to select the most ethical, environmentally friendly,
              cruelty free shoes for climbing while also not sacrificing the
              performance of our climbing can be tricky. Here at V-Climb we have
              done the hard work for you with all the confirmed vegan rock
              climbing shoes in one place to help you make the best choice
              easier for you, the planet, and the animals.
            </p>
          </article>
          <div className="grid grid-cols-1 px-1 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-4 md:col-span-3 lg:col-span-2">
              <Filters />
            </div>
            <div className="sm:col-span-8 md:col-span-9 gap-4 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lx:grid-cols-4 my-4">
              {state.filteredShoes
                ? card(state.filteredShoes, brands)
                : card(shoes, brands)}
            </div>
          </div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <h1>Error loading Props</h1>
      <p>{JSON.stringify(error)}</p>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const props = await getAllData();
  return { props: props };
};
