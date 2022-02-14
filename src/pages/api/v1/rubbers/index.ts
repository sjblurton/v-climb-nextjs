import { prisma } from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { stringifyTheDates } from "../../../../helper/stringify";
import { ApiError, RubberWithStringDates } from "../../../../interface";

type Data = {
  rubbers: RubberWithStringDates[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ApiError>
) {
  if (req.method === "GET") {
    try {
      const rubbers = await prisma.rubber.findMany();
      const datesAsStrings = stringifyTheDates(
        rubbers
      ) as RubberWithStringDates[];
      res.status(200).json({ rubbers: datesAsStrings });
    } catch (error) {
      // TODO Add alert
      res.status(500).json({ error: `server error` });
    }
  }
}
