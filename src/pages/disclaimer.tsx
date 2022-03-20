import React from "react";
import { Layout, Seo } from "../components/shared";
import { data } from "../data/about";

const Disclaimer = () => {
  return (
    <>
      <Seo
        templateTitle="VCLIMB | Disclaimer on the database."
        description="A quick disclaimer that the data that we have been given by the companies might be incorrect, or we may have made a mistake. Please feel free to contact the manufacturer before purchase."
      />
      <Layout>
        <article className="px-2 my-6 max-w-lg mx-auto flex flex-col gap-y-3">
          <h1 className="text-4xl text-slate-50 font-bold">
            {data.disclaimer.title}
          </h1>
          {data.disclaimer.body.map((p, i) => (
            <>
              <p key={i} className="text-slate-200">
                {p}
              </p>
            </>
          ))}
        </article>
      </Layout>
    </>
  );
};

export default Disclaimer;
