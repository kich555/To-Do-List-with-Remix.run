import { createCookieSessionStorage, redirect } from '@remix-run/node';
import bcrypt from 'bcryptjs/dist/bcrypt';
import { findUser, findUserWithId, createUser  } from '~/models/user.server';


export async function login({ username, password }) {
  // find User
  const user = await findUser(username);

  if (!user) return;

  // password validation
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isCorrectPassword) return;

  return { id: user.id, username };
};

export async function logout(request) {
  const session = await getUserSession(request);
  return redirect('/', {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    },
  });
};

export async function register({ username, password }) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await createUser({ username, passwordHash });
  const { id } = user;
  return { id, username };
};

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
};

const storage = createCookieSessionStorage({
  cookie: {
    name: 'Remix_TodoList_session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});



function getUserSession(request) {
  return storage.getSession(request.headers.get('Cookie'));
};



export async function getUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  if (!userId || typeof userId !== 'string') return;
  return userId;
};

export async function getUser(request) {
  const userId = await getUserId(request); 

  if(typeof userId !== 'string') return;

  try {
    const user = await findUserWithId(userId);
    return user;
  } catch {
    throw logout(request);
  };
};

export async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  const session = await getUserSession(request);
  const userId = session.get('userId');
  console.log('userId--->', userId, typeof userId);
  if (!userId || typeof userId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/auth/login?${searchParams}`);
  };
  return userId;
};

export async function createUserSession(userId, redirectTo) {
  const session = await storage.getSession();
  session.set('userId', userId);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
};
