import { prisma } from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { stringifyTheDates } from "../../../../helper/stringify";
import { ApiError, BrandWithStringDates } from "../../../../interface";

type Data = {
  brands: BrandWithStringDates[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ApiError>
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
      res.status(500).json({ error: `server error` });
    }
  }

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
      res.status(500).json({ error: `server error` });
    }
  }
}
