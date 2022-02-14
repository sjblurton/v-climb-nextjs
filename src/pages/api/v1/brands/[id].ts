import { prisma } from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getProps } from "../../../../service/getProps";
import { Brand } from "@prisma/client";

type Data = { brands: { id: string; name: string }[] } | Brand;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "DELETE") {
    const brand = await prisma.brand.delete({
      where: {
        id: req.query.id.toString(),
      },
    });
    if (brand) res.send({ brands: [brand] });
  }
}
