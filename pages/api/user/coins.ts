// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

interface DbUser {
  email: string;
  coins: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DbUser>
) {
  const { email, name } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        coins: 0,
        email: email,
        name: name,
      },
    });

    res.status(201).send(newUser);
  } else {
    res.status(200).send(user);
  }
}
