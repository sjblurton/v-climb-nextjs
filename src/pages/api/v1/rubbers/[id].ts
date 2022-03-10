import prisma from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { stringifyTheDates } from "../../../../helper/stringify";
import {
  ApiError,
  RubberPost,
  RubberWithStringDates,
} from "../../../../interface";
import { getSession } from "next-auth/react";

type Data = {
  rubbers: RubberWithStringDates[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
      res.status(500).send(error);
    }
  }

  const session = await getSession({ req });

  if (req.method !== "GET") {
    if (session) {
      if (req.method === "DELETE") {
        try {
          const rubber = await prisma.rubber.delete({
            where: {
              id: ID,
            },
          });
          if (rubber) {
            const datesAsStrings = stringifyTheDates([
              rubber,
            ]) as RubberWithStringDates[];
            res.status(200).json({ rubbers: datesAsStrings });
          } else {
            res.status(404).json({ error: `couldn't find rubber id: ${ID}` });
          }
        } catch (error) {
          res.status(500).send(error);
        }
      }
      if (req.method === "PUT") {
        try {
          const rubberData: RubberPost = req.body;
          const rubber = await prisma.rubber.update({
            where: {
              id: ID,
            },
            data: rubberData,
          });
          if (rubber) {
            const datesAsStrings = stringifyTheDates([
              rubber,
            ]) as RubberWithStringDates[];
            res.status(200).json({ rubbers: datesAsStrings });
          } else {
            res.status(404).json({ error: `couldn't find brand id: ${ID}` });
          }
        } catch (error) {
          res.status(500).send(error);
        }
      }
    } else {
      console.log(
        "Must be logged in as ADMIN for anything other than a GET request"
      );
      res.status(401);
    }
    res.end();
  }
}
