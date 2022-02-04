import { getProps } from "../service/getProps";
import { Brand, Rubber, Shoes } from "@prisma/client";
import { Accordion, Layout, Seo } from "../components";

interface Props {
  brands: Brand;
  rubbers: Rubber;
  shoes: Shoes;
}

const Home = (props: Props) => {
  console.log(props);
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
        <div className="container flex px-2 mx-auto">
          <Accordion
            title="Filters"
            content={
              <Accordion title="Recommend For" content="content goes here" />
            }
          />
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => await getProps.getAllData();
