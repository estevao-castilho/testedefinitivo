// /pages/api/auth/_log.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  console.log('Log recebido:', req.body); // Log no servidor
  res.status(200).json({ success: true });
}