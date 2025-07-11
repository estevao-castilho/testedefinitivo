import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { parse } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const cookies = parse(req.headers.cookie || '');
  const session = cookies.user_session;

  if (!session) {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session },
      select: { email: true, references: true, bonus: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    return res.status(200).json(user);
  } catch {
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}
