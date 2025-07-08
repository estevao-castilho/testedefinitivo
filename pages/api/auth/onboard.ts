// pages/api/auth/onboard.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

export default async function onboard(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password, refCode } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Dados incompletos.' });

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'Usuário já existe.' });

  const hashedPassword = await bcrypt.hash(password, 10);

  let refById = null;
  if (refCode) {
    const refBy = await prisma.user.findUnique({ where: { referralCode: refCode } });
    if (!refBy) return res.status(400).json({ message: 'Código de referência inválido.' });
    refById = refBy.id;
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      referralCode: nanoid(6),
      referredById: refById,
    },
  });

  if (refById) {
    await prisma.user.update({
      where: { id: refById },
      data: {
        bonus: { increment: 5 },
        references: { increment: 1 },
      },
    });
  }

  return res.status(201).json({ message: 'Usuário criado com sucesso.' });
}
