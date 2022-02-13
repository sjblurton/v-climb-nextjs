import { prisma } from "../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getProps } from "../../../../service/getProps";
import { BrandList } from "../../../../interface";
import { Brand } from "@prisma/client";

type Data =
  | {
      content: string;
    }
  | { error: string }
  | { brands: { id: string; name: string }[] }
  | { data: Brand };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const session = await getSession({ req });

  if (req.method === "GET") {
    const brands = await getProps.getBrandNames();
    res.send({ brands: brands });
  }

  if (req.method === "POST") {
    const brandData = req.body;

    const savedBrand = await prisma.brand.create({
      data: {
        name: "Mad rock",
      },
    });

    res.send({ content: "hello" });
  } else {
    res.send({
      error: "not a post or get req",
    });
  }
}
