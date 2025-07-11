import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para gerar um código de referência de 6 caracteres
function generateReferralCode(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

  const { email, password, refCode } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Usuário já existe' });

    // Verifica o referenciador ANTES de criar o usuário
    let referrer = null;
    if (refCode) {
      referrer = await prisma.user.findUnique({ where: { referralCode: refCode } });
      if (!referrer) return res.status(400).json({ error: 'Código de referência não existe!' });
    }

    const referralCode = generateReferralCode(6);

    // Cria o novo usuário (senha em texto puro conforme solicitado)
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        referralCode,
        referredById: referrer?.id // Vincula o referenciador se existir
      }
    });

    // Atualiza o referenciador APÓS criação do usuário
    if (referrer) {
      await prisma.user.update({
        where: { id: referrer.id },
        data: {
          references: { increment: 1 },
          bonus: { increment: 5 } // R$5 por indicação
        }
      });
    }

    return res.status(201).json({ 
      message: 'Cadastro realizado',
      userId: newUser.id,
      referralCode: referralCode // Retorna o código gerado para feedback
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}
