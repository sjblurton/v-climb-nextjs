import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stringifyTheDates } from "../../../../helper/stringify";
import { ShoePost, ShoeWithStringDates } from "../../../../interface";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const array = Object.keys(req.query);
    if (array.length > 0) {
      const baseQueryArray = array.map((item) => {
        if (item === "take" || item === "skip") {
          return { [item]: Number(req.query[item]) };
        }
      });

      const whereQueryArray = array.map((item) => {
        if (item !== "take" && item !== "skip") {
          return { [item]: req.query[item] };
        }
      });
      const whereQuery = Object.assign({}, ...whereQueryArray);
      const baseQuery = Object.assign({}, ...baseQueryArray);

      const prismaQuery = { ...baseQuery, ...{ where: whereQuery } };

      try {
        const shoes = await prisma.shoes.findMany(prismaQuery);
        const datesAsStrings = stringifyTheDates(
          shoes
        ) as ShoeWithStringDates[];
        res.send({ shoes: datesAsStrings });
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      try {
        const shoes = await prisma.shoes.findMany();
        const datesAsStrings = stringifyTheDates(
          shoes
        ) as ShoeWithStringDates[];
        res.send({ shoes: datesAsStrings });
      } catch (error) {
        res.status(500).send(error);
      }
    }
  }

  //   const session = await getSession({ req });

  //   if (req.method === "POST") {
  //     if (session) {
  //       try {
  //         const shoeData: ShoePost = req.body;

  //         const savedShoe = await prisma.shoes.create({
  //           data: shoeData,
  //         });
  //         if (savedShoe) {
  //           const datesAsStrings = stringifyTheDates([
  //             savedShoe,
  //           ]) as ShoeWithStringDates[];
  //           res.status(200).json({ shoes: datesAsStrings });
  //         } else res.status(404).json({ error: `shoe not added` });
  //       } catch (error) {
  //         res.status(500).send(error);
  //       }
  //     } else {
  //       console.log(
  //         "Must be logged in as ADMIN for anything other than a GET request"
  //       );
  //       res.status(401);
  //     }
  //     res.end();
  //   }
}
