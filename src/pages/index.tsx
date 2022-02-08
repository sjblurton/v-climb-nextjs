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
          <div className="sm:col-span-8 md:col-span-9 gap-4 lg:col-span-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lx:grid-cols-lx mt-4">
            {shoes.map((shoe, i) => (
              <Card key={i} shoes={shoe} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

// TODO: uncomment why i start adding data to the databases
// export const getServerSideProps = async () => await getProps.getAllData();
