import { PrismaClient } from '@prisma/client'

// Extendemos o tipo global do Node.js para incluir nossa variável prisma
declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient
    }
  }
}

// Inicialização segura para TypeScript
const prisma: PrismaClient = (() => {
  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient()
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }
    return global.prisma
  }
})()

export default prisma