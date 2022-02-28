import type { NextApiRequest, NextApiResponse } from "next";
import { stringifyTheDates } from "../../../../helper/stringify";
import { ApiError, ShoePost, ShoeWithStringDates } from "../../../../interface";
import { prisma } from "../../../../lib/prisma";

type Data = {
  shoes: ShoeWithStringDates[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ApiError>
) {
  if (req.method === "GET") {
    const array = Object.keys(req.query);
    if (array.length > 0) {
      const queryArray = array.map((item) => {
        if (/(\[\])/g.test(item)) {
          return {
            [item.replace(/(\[\])/g, "")]: { in: req.query[item] },
          };
        }
        return { [item]: req.query[item] };
      });

      const prismaQuery = { where: Object.assign({}, ...queryArray) };

      try {
        const shoes = await prisma.shoes.findMany(prismaQuery);
        const datesAsStrings = stringifyTheDates(
          shoes
        ) as ShoeWithStringDates[];
        res.send({ shoes: datesAsStrings });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: `server error` });
      }
    } else {
      try {
        const shoes = await prisma.shoes.findMany();
        const datesAsStrings = stringifyTheDates(
          shoes
        ) as ShoeWithStringDates[];
        res.send({ shoes: datesAsStrings });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: `server error` });
      }
    }
  }

  if (req.method === "POST") {
    try {
      const shoeData: ShoePost = req.body;

      const savedShoe = await prisma.shoes.create({
        data: shoeData,
      });
      if (savedShoe) {
        const datesAsStrings = stringifyTheDates([
          savedShoe,
        ]) as ShoeWithStringDates[];
        res.status(200).json({ shoes: datesAsStrings });
      } else res.status(404).json({ error: `shoe not added` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: `server error` });
    }
  }
}
