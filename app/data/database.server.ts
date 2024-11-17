import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prisma
    .$connect()
    .then(() => console.log('Successfully connected to database in production'))
    .catch((error) => console.error('Failed to connect to database:', error));
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db
      .$connect()
      .then(() =>
        console.log('Successfully connected to database in development')
      )
      .catch((error) => console.error('Failed to connect to database:', error));
  }
  prisma = global.__db;
}

export { prisma };
