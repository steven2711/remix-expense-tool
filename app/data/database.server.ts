import { PrismaClient } from '@prisma/client';

/**
 * @type PrismaClient
 */
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  try {
    prisma = new PrismaClient();
    await prisma.$connect();
    console.log('Successfully connected to database in production');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
} else {
  if (!global.__db) {
    try {
      global.__db = new PrismaClient();
      await global.__db.$connect();
      console.log('Successfully connected to database in development');
    } catch (error) {
      console.error('Failed to connect to database:', error);
      throw error;
    }
  }
  prisma = global.__db;
}

export { prisma };
