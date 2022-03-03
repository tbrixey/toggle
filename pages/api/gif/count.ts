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
    const gif = await prisma.gif.findUnique({
      where: {
        url: url,
      },
    });

    res.status(200).send(gif);
  } else {
    res.status(401);
  }
}
