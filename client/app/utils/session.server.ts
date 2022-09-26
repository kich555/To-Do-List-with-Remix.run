import { createCookieSessionStorage, redirect } from '@remix-run/node';
import { findUser, findUserWithId, createUser } from '~/models/user.server';
import bcrypt from 'bcryptjs';

interface authParameter {
  username: string;
  password: string;
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
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export async function register({ username, password }: authParameter) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({ username, passwordHash });
  const { id } = user;
  return { id, username };
}

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'Remix_TodoList_session',
    /**
     * Safari localhost에서는 `secure: true`가 동작하는 않는 이슈가 있음
     *  https://web.dev/when-to-use-local-https/
     **/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function getUserId(request: Request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');

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
  const session = await getUserSession(request);
  const userId = session.get('userId');

  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/auth/login?${searchParams}`);
  }
  return userId;
}

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}
