import { prisma } from './database.server';
import bcrypt from 'bcryptjs';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be set');
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
  },
});

async function createUserSession(userId: string, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    headers: { 'Set-Cookie': await sessionStorage.commitSession(session) },
  });
}

export async function getUserFromSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  const userId = session.get('userId');
  if (!userId) {
    return null;
  }

  return userId;
}

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const userExists = await prisma.user.findFirst({ where: { email } });
  if (userExists) {
    const error = new Error('User already exists');
    error.status = 422;
    throw error;
  }

  const passwordHash = await bcrypt.hashSync(password, 12);

  const user = await prisma.user.create({
    data: { email, password: passwordHash },
  });

  return createUserSession(user.id, '/expenses');
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    const error = new Error(
      'Could not log you in, please check your credentials.'
    );
    error.status = 401;
    throw error;
  }

  const passwordsMatch = await bcrypt.compareSync(password, user.password);

  if (!passwordsMatch) {
    const error = new Error(
      'Could not log you in, please check your credentials.'
    );
    error.status = 401;
    throw error;
  }

  // create session

  return createUserSession(user.id, '/expenses');
}

export async function destroyUserSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  return redirect('/', {
    headers: { 'Set-Cookie': await sessionStorage.destroySession(session) },
  });
}

export async function requireUserSession(request: Request) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    throw redirect('/auth?mode=login');
  }
  return userId;
}
