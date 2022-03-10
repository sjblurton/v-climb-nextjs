import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { stringifyTheDates } from "../../../../helper/stringify";
import { BrandPost, BrandWithStringDates } from "../../../../interface";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ID = req.query.id.toString();

  if (req.method === "GET") {
    try {
      const brand = await prisma.brand.findUnique({ where: { id: ID } });
      if (brand) {
        const datesAsStrings = stringifyTheDates([
          brand,
        ]) as BrandWithStringDates[];
        res.status(200).json({ brands: datesAsStrings });
      } else {
        res.status(404).json({ error: `couldn't brand find id: ${ID}` });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  const session = await getSession({ req });

  if (req.method !== "GET") {
    if (session) {
      if (req.method === "DELETE") {
        try {
          const brand = await prisma.brand.delete({
            where: {
              id: ID,
            },
          });
          if (brand) {
            const datesAsStrings = stringifyTheDates([
              brand,
            ]) as BrandWithStringDates[];
            res.status(200).json({ brands: datesAsStrings });
          } else {
            res.status(404).json({ error: `couldn't find brand id: ${ID}` });
          }
        } catch (error) {
          res.status(500).send(error);
        }
      }

      if (req.method === "PUT") {
        try {
          const brandData: BrandPost = req.body;
          const brand = await prisma.brand.update({
            where: {
              id: ID,
            },
            data: brandData,
          });
          if (brand) {
            const datesAsStrings = stringifyTheDates([
              brand,
            ]) as BrandWithStringDates[];
            res.status(200).json({ brands: datesAsStrings });
          } else {
            res.status(404).json({ error: `couldn't find brand id: ${ID}` });
          }
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
