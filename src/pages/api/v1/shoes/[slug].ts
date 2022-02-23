import { prisma } from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { stringifyTheDates } from "../../../../helper/stringify";
import { ApiError, ShoePost, ShoeWithStringDates } from "../../../../interface";

type Data = {
  shoes: ShoeWithStringDates[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ApiError>
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
      console.log(error);
      res.status(500).json({ error: `server error` });
    }
  }

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
      console.log(error);
      res.status(500).json({ error: `server error` });
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
      console.log(error);
      res.status(500).json({ error: `server error` });
    }
  }
}
