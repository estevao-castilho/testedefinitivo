import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ 
      where: { email } 
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const cookie = serialize('user_session', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);
    return res.status(200).json({ message: 'Login bem-sucedido' });
  } catch {
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}
