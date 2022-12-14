import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { findUser, findUserWithId, createUser } from '~/models/user.server';
import bcrypt from 'bcryptjs';
import invariant from 'tiny-invariant';
import { User } from '@prisma/client';

interface authParameter {
  username: string;
  password: string;
}

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set');

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'Remix_TodoList_session',
    /**
     * Safari localhost에서는 `secure: true`가 동작하는 않는 이슈가 있음
     *  https://web.dev/when-to-use-local-https/
     **/
    secure: process.env.NODE_ENV === 'production',
    secrets: [process.env.SESSION_SECRET],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

const USER_SESSION_KEY = 'userId';

function getUserSession(request: Request) {
  const cookie = request.headers.get('Cookie');
  return sessionStorage.getSession(cookie);
}

export async function login({ username, password }: authParameter) {
  // find User
  const user = await findUser(username);

  if (!user) return;

  // password validation
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isCorrectPassword) return;

  return { id: user.id, username };
}

export async function logout(request: Request) {
  const session = await getUserSession(request);

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

export async function register({ username, password }: authParameter) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({ username, passwordHash });
  const { id } = user;
  return { id, username };
}

export async function getUserId(request: Request): Promise<User['id'] | undefined> {
  const session = await getUserSession(request);
  const userId = session.get(USER_SESSION_KEY);
  if (!userId || typeof userId !== 'string') return;
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);

  if (typeof userId !== 'string') return;

  try {
    const user = await findUserWithId(userId);
    return user;
  } catch {
    throw logout(request);
  }
}

export async function requireUserId(request: Request, redirectTo = new URL(request.url).pathname) {
  const userId = await getUserId(request);
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/auth/login?${searchParams}`);
  }
  return userId;
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await sessionStorage.getSession();

  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}
