// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (session) {
    const { email, cost, categories } = req.body;
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        coins: {
          increment: -cost,
        },
        categories,
      },
    });

    res.status(200).send(user);
  } else {
    res.status(401);
  }
}
