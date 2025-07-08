import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { parse } from 'cookie';

const prismaAccount = new PrismaClient();

export default async function account(req: NextApiRequest, res: NextApiResponse) {
  const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
  const userId = cookies.auth;

  if (!userId) return res.status(401).json({ message: 'Não autenticado.' });

  const user = await prismaAccount.user.findUnique({
    where: { id: userId },
    select: { references: true, bonus: true },
  });

  if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

  return res.status(200).json(user);
}