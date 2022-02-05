import { Brand, Rubber, Shoes } from "@prisma/client";
import { Accordion, Card, Layout, Seo } from "../components";
import { VolumeType } from "@prisma/client";
import { climberWeight, recommendFor } from "../data/filters";
import { RadioContainer } from "../components/radio_container";
import { shoes } from "../data/shoeSeedData";

interface Props {
  brands: Brand;
  rubbers: Rubber;
  shoes: Shoes;
}

const Home = (props: Props) => {
  console.log(shoes);
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
        <div className="container flex px-2 mx-auto flex-col sm:flex-row">
          <div className="flex-none">
            <Accordion
              title="Filters"
              content={
                <>
                  <Accordion
                    title="Climber Weight"
                    content={
                      <RadioContainer
                        radioDefault="55kg to 75kg"
                        list={climberWeight}
                      />
                    }
                  />

                  <Accordion
                    title="Recommend For"
                    content={
                      <RadioContainer
                        radioDefault="View All"
                        list={recommendFor}
                      />
                    }
                  />
                  <Accordion
                    title="Volume"
                    content={
                      <RadioContainer
                        radioDefault="average"
                        list={Object.values(VolumeType).map((word) =>
                          word.toLowerCase()
                        )}
                      />
                    }
                  />
                </>
              }
            />
          </div>
          <div className="flex-1 flex flex-wrap mt-4">
            <Card />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

// TODO: uncomment why i start adding data to the databases
// export const getServerSideProps = async () => await getProps.getAllData();
