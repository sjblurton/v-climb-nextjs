import { Accordion, Card, Layout, Seo } from "../components";
import { getProps } from "../service/getProps";
import { brandNameFromId } from "../helper/stringify";
import { Brand, Rubber, Shoes } from "@prisma/client";

interface Props {
  brands: Brand[];
  shoes: Shoes[];
  rubbers: Rubber[];
}

const Home = ({ shoes, brands }: Props) => {
  return (
    <>
      <Seo />
      <Layout>
        <article className="px-2 text-olive-50 my-6 max-w-lg mx-auto flex flex-col gap-y-3">
          <h1 className="text-6xl text-olive-50 font-bold">V-CLIMB</h1>
          <h3 className="text-3xl">Vegan Rock Climbing Shoes</h3>
          <p>
            Trying to select the most ethical, environmentally friendly, cruelty
            free shoes for climbing while also not sacrificing the performance
            of our climbing can be tricky. Here at V-Climb we have done the hard
            work for you with all the confirmed vegan rock climbing shoes in one
            place to help you make the best choice easier for you, the planet,
            and the animals.
          </p>
        </article>
        <div className="grid grid-cols-1 px-1 sm:grid-cols-12 gap-2">
          <div className="sm:col-span-4 md:col-span-3 lg:col-span-2">
            <Accordion
              title="Filters"
              content={
                <Accordion
                  title="Brand"
                  content={
                    <>
                      {brands.map((brand) => (
                        <li key={brand.id}>{brand.name}</li>
                      ))}
                    </>
                  }
                />
              }
            />
          </div>
          <div className="sm:col-span-8 md:col-span-9 gap-4 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lx:grid-cols-lx my-4">
            {shoes.map((shoe) => (
              <Card
                key={shoe.slug}
                shoe={shoe}
                brand={brandNameFromId(brands, shoe.brandId)}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const props = await getProps.getHomePageData();
  return { props };
};
