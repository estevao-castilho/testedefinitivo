// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const { email, password } = req.body;

  try {
    // Lógica de autenticação do usuário
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Esta combinação de e-mail e senha está incorreta!' });
    }

    // Se a autenticação for bem-sucedida
    return res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (err) {
    console.error('Erro durante o login:', err); // Agora usando a variável err
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}
