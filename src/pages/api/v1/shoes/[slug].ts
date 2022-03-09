import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { stringifyTheDates } from "../../../../helper/stringify";
import { ShoePost, ShoeWithStringDates } from "../../../../interface";
import { getSession } from "next-auth/react";

type Data = {
  shoes: ShoeWithStringDates[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const SLUG = req.query.slug.toString();

  if (req.method === "GET") {
    try {
      const shoe = await prisma.shoes.findUnique({ where: { slug: SLUG } });
      if (shoe) {
        const datesAsStrings = stringifyTheDates([
          shoe,
        ]) as ShoeWithStringDates[];
        res.status(200).json({ shoes: datesAsStrings });
      } else {
        res.status(404).json({ error: `couldn't shoe find slug: ${SLUG}` });
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
          const shoe = await prisma.shoes.delete({ where: { slug: SLUG } });
          if (shoe) {
            const datesAsStrings = stringifyTheDates([
              shoe,
            ]) as ShoeWithStringDates[];
            res.status(200).json({ shoes: datesAsStrings });
          } else {
            res.status(404).json({ error: `couldn't find rubber id: ${SLUG}` });
          }
        } catch (error) {
          res.status(500).send(error);
        }
      }
      if (req.method === "PUT") {
        try {
          const shoeData: ShoePost = req.body;

          const savedShoe = await prisma.shoes.update({
            where: {
              slug: SLUG,
            },
            data: shoeData,
          });
          if (savedShoe) {
            const datesAsStrings = stringifyTheDates([
              savedShoe,
            ]) as ShoeWithStringDates[];
            res.status(200).json({ shoes: datesAsStrings });
          } else res.status(404).json({ error: `shoe not found` });
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
