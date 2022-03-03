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
    const { url } = req.body;
    const user = await prisma.gif.upsert({
      where: {
        url: url,
      },
      update: {
        dislikes: {
          increment: 1,
        },
      },
      create: {
        url: url,
        likes: 0,
        dislikes: 1,
      },
    });

    res.status(200).send(user);
  } else {
    res.status(401);
  }
}
