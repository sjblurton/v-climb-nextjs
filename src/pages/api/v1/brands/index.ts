import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { stringifyTheDates } from "../../../../helper/stringify";
import { BrandPost, BrandWithStringDates } from "../../../../interface";
import { getSession } from "next-auth/react";

type Data = {
  brands: BrandWithStringDates[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const brands = await prisma.brand.findMany();
      const datesAsStrings = stringifyTheDates(
        brands
      ) as BrandWithStringDates[];
      res.status(200).json({ brands: datesAsStrings });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  const session = await getSession({ req });

  if (req.method !== "GET") {
    if (session) {
      if (req.method === "POST") {
        try {
          const brandData: BrandPost = req.body;
          const savedBrand = await prisma.brand.create({
            data: brandData,
          });
          if (savedBrand) {
            const datesAsStrings = stringifyTheDates([
              savedBrand,
            ]) as BrandWithStringDates[];
            res.status(200).json({ brands: datesAsStrings });
          } else res.status(400).json({ error: "brand not added." });
        } catch (error) {
          res.status(500).send(error);
        }
      }
    } else {
      res
        .status(401)
        .send(
          "Must be logged in as ADMIN for anything other than a GET request"
        );
    }
    res.end();
  }
}
