import { prisma } from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getProps } from "../../../../service/getProps";
import { Brand } from "@prisma/client";

type Data =
  | {
      content: string;
    }
  | { error: string }
  | { brands: { id: string; name: string }[] }
  | Brand;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const brands = await getProps.getBrandNames();
    if (brands) res.send({ brands: brands });
  }

  if (req.method === "POST") {
    const brandData = JSON.parse(req.body);
    const savedBrand = await prisma.brand.create({
      data: brandData,
    });
    res.send(savedBrand);
  }
}
