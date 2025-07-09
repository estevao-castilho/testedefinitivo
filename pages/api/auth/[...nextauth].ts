// /pages/api/auth/session.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // Exemplo: Retornar dados da sessão (ajuste conforme sua lógica)
  res.status(200).json({ user: null, isLoggedIn: false });
}