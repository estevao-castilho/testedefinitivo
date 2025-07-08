import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  const cookie = serialize('auth', '', {
    path: '/',
    httpOnly: true,
    maxAge: -1,
  });

  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ message: 'Logout realizado com sucesso.' });
}
