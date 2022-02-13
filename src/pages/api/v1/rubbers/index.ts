// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StiffnessType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getProps } from "../../../../service/getProps";

type Data =
  | {
      content: string;
    }
  | { error: string }
  | {
      rubbers: {
        id: string;
        name: string;
        stiffness: StiffnessType;
        brandId: string;
        description: string;
      }[];
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({ req });

  const rubbers = await getProps.getRubberNames();

  if (req.method === "GET") res.send({ rubbers: rubbers });
  // if (session) {
  //   res.send({
  //     content:
  //       "This is protected content. You can access this content because you are signed in.",
  //   });
  // } else {
  //   res.send({
  //     error: "You must be sign in to view the protected content on this page.",
  //   });
  // }
}
