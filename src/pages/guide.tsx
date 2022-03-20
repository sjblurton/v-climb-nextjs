import { StiffnessType, VeganType } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Layout, Seo, VeganImage } from "../components/shared";
import { RubberTable } from "../components/table";
import { data } from "../data/about";
import { stringifyTheDates } from "../helper/stringify";
import { RubberWithStringDates } from "../interface";
import prisma from "../lib/prisma";

export type RubberWithBrandName = {
  brand: string | undefined;
  id: string;
  createdAt: string;
  updatedAt: string;
  brandId: string;
  name: string;
  stiffness: StiffnessType;
  description: string;
  image: string;
};

type Props = {
  rubbers: {
    soft: RubberWithBrandName[];
    average: RubberWithBrandName[];
    stiff: RubberWithBrandName[];
  };
};

const About = ({ rubbers }: Props) => {
  const { average, soft, stiff } = rubbers;

  return (
    <>
      <Seo templateTitle="Guide on how to pick the right vegan climbing shoes" />
      <Layout>
        <article className="px-2 my-6 max-w-4xl mx-auto flex flex-col gap-y-3">
          <h1 className="text-6xl text-slate-50 font-bold mb-6">
            Climbing Shoe Guide
          </h1>
          <h2 className="text-4xl text-slate-50 font-bold mb-6">
            Guide on how to pick the right vegan climbing shoes...
          </h2>
          <h3 className="text-3xl text-slate-100 font-bold mb-6">
            Are they vegan?
          </h3>
          <Link href={"/disclaimer"}>
            <a className="text-lime-300 underline hover:text-lime-50">
              Check The Disclaimer
            </a>
          </Link>
          {data.vegan.map((item, i) => (
            <div key={i} className="relative mb-3">
              <div className="absolute -top-8 right-2 z-10">
                {VeganImage(item.type as VeganType)}
              </div>
              <h4 className="text-xl text-slate-100 font-bold">{item.title}</h4>
              <p className="text-slate-200 py-2">{item.body}</p>
            </div>
          ))}
          <h3 className="text-3xl text-slate-100 font-bold mb-6">
            Selecting the right Profile?
          </h3>
          {data.profile.map((item, i) => (
            <div key={i} className="relative mb-3">
              <h4 className="text-xl text-slate-100 font-bold">{item.title}</h4>
              {item.body.map((p, j) => (
                <p key={j} className="text-slate-200 py-2">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <h3 className="text-3xl text-slate-100 font-bold mb-6">
            Selecting the right Asymmetry?
          </h3>
          {data.asymmetry.map((item, i) => (
            <div key={i} className="relative mb-3">
              <h4 className="text-xl text-slate-100 font-bold">{item.title}</h4>
              {item.body.map((p, j) => (
                <p key={j} className="text-slate-200 py-2">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <h3 className="text-3xl text-slate-100 font-bold mb-6">
            Selecting the right Midsole?
          </h3>
          {data.midsole.map((item, i) => (
            <div key={i} className="relative mb-3">
              <h4 className="text-xl text-slate-100 font-bold">{item.title}</h4>
              {item.body.map((p, j) => (
                <p key={j} className="text-slate-200 py-2">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <h3 className="text-3xl text-slate-100 font-bold mb-6">
            Selecting the right Rubber?
          </h3>
          {data.rubber.map((item, i) => {
            return (
              <div key={i} className="relative mb-3">
                <h4 className="text-xl text-slate-100 font-bold">
                  {item.title}
                </h4>
                {item.body.map((p, j) => (
                  <p key={j} className="text-slate-200 py-2">
                    {p}
                  </p>
                ))}
                <h4 className="text-xl text-slate-100 font-bold py-2">
                  {`List of the ${item.type.toLocaleLowerCase()} rubbers.`}
                </h4>
                {rubbers && item.type === "SOFT" && (
                  <RubberTable rubbers={soft} />
                )}
                {rubbers && item.type === "AVERAGE" && (
                  <RubberTable rubbers={average} />
                )}
                {rubbers && item.type === "STIFF" && (
                  <RubberTable rubbers={stiff} />
                )}
              </div>
            );
          })}
        </article>
      </Layout>
    </>
  );
};

export default About;

export const getStaticProps = async () => {
  const rubbers = await prisma.rubber.findMany();
  const brands = await prisma.brand.findMany({
    select: { id: true, name: true },
  });

  const rubbersDatesAsStrings = stringifyTheDates(
    rubbers
  ) as RubberWithStringDates[];

  const rubbersWithBrandNames = rubbersDatesAsStrings.map((item) => {
    return {
      ...item,
      brand: brands.filter((brand) => brand.id === item.brandId)[0].name,
    };
  });

  return {
    props: {
      rubbers: {
        soft: rubbersWithBrandNames.filter((item) => item.stiffness === "SOFT"),
        average: rubbersWithBrandNames.filter(
          (item) => item.stiffness === "AVERAGE"
        ),
        stiff: rubbersWithBrandNames.filter(
          (item) => item.stiffness === "STIFF"
        ),
      },
    },
    revalidate: 1000,
  };
};
