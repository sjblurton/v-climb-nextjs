import {
  AsymmetryType,
  ClosureType,
  HookingType,
  PriceType,
  ProfileType,
  RubberThicknessType,
  StiffnessType,
  VeganType,
  VolumeType,
} from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getProps } from "../../../../service/getProps";

type Data =
  | {
      content: string;
    }
  | { error: string }
  | {
      shoes: {
        id: string;
        name: string;
        brandId: string;
        veganType: VeganType;
        image: string;
        price: PriceType;
        slug: string;
        closure: ClosureType;
        asymmetry: AsymmetryType;
        hooking: HookingType;
        midsole: StiffnessType;
        rubberId: string;
        profile: ProfileType;
        rubber_thickness: RubberThicknessType;
        volume: VolumeType;
        description: string;
      }[];
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });

  const shoes = await getProps.getShoesCardData();

  if (req.method === "GET") res.send({ shoes: shoes });
  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
}
