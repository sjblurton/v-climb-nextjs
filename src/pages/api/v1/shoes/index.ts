import type { NextApiRequest, NextApiResponse } from "next";
import { stringifyTheDates } from "../../../../helper/stringify";
import { ApiError, ShoeWithStringDates } from "../../../../interface";
import { prisma } from "../../../../lib/prisma";

type Data = {
  shoes: ShoeWithStringDates[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ApiError>
) {
  if (req.method === "GET") {
    try {
      const shoes = await prisma.shoes.findMany();
      const datesAsStrings = stringifyTheDates(shoes) as ShoeWithStringDates[];
      res.send({ shoes: datesAsStrings });
    } catch (error) {
      // TODO Add alert
      res.status(500).json({ error: `server error` });
    }
  }
}
