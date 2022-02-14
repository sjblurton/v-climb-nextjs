import { prisma } from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { stringifyTheDates } from "../../../../helper/stringify";
import { ApiError, ShoeWithStringDates } from "../../../../interface";

type Data = {
  shoes: ShoeWithStringDates[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ApiError>
) {
  const ID = req.query.id.toString();
  if (req.method === "GET") {
    try {
      const shoe = await prisma.shoes.findUnique({ where: { id: ID } });
      if (shoe) {
        const datesAsStrings = stringifyTheDates([
          shoe,
        ]) as ShoeWithStringDates[];
        res.status(200).json({ shoes: datesAsStrings });
      } else {
        res.status(404).json({ error: `couldn't rubber find id: ${ID}` });
      }
    } catch (error) {
      // TODO Add alert
      res.status(500).json({ error: `server error` });
    }
  }
}
