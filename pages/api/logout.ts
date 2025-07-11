import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  res.setHeader('Set-Cookie', serialize('user_session', '', {
    path: '/',
    expires: new Date(0)
  }));

  return res.status(200).json({ message: 'Logout realizado' });
}
