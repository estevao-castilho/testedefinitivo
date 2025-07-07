import { PrismaClient } from '@prisma/client'

// 1. Extensão de tipo para globalThis
declare global {
  var prisma: PrismaClient | undefined
}

// 2. Inicialização segura com TypeScript
const prisma: PrismaClient = globalThis.prisma || new PrismaClient()

// 3. Preservar a instância em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export default prisma