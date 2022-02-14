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
  const ID = req.query.id.toString();
  if (req.method === "GET") {
    try {
      const rubber = await prisma.rubber.findUnique({ where: { id: ID } });
      if (rubber) {
        const datesAsStrings = stringifyTheDates([
          rubber,
        ]) as RubberWithStringDates[];
        res.status(200).json({ rubbers: datesAsStrings });
      } else {
        res.status(404).json({ error: `couldn't rubber find id: ${ID}` });
      }
    } catch (error) {
      // TODO Add alert
      res.status(500).json({ error: `server error` });
    }
  }
}
