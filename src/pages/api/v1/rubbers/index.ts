import { prisma } from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { stringifyTheDates } from "../../../../helper/stringify";
import {
  ApiError,
  RubberPost,
  RubberWithStringDates,
} from "../../../../interface";

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
      console.log(error);
      res.status(500).json({ error: `server error` });
    }
  }

  if (req.method === "POST") {
    try {
      const rubberData: RubberPost = req.body;
      const savedRubber = await prisma.rubber.create({
        data: rubberData,
      });
      if (savedRubber) {
        const datesAsStrings = stringifyTheDates([
          savedRubber,
        ]) as RubberWithStringDates[];
        res.status(200).json({ rubbers: datesAsStrings });
      } else res.status(400).json({ error: "rubber not added." });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ error: `server error` });
    }
  }
}
