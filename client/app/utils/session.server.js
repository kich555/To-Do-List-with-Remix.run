import { createCookieSessionStorage, redirect } from '@remix-run/node';
import bcrypt from 'bcryptjs/dist/bcrypt';
import { findUser } from '~/models/user.server';

export async function login({username, password }) {

  // find User
  const user = await findUser(username)

  if(!user) return

  // password validation
  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)

  if(!isCorrectPassword) return

  return {id: user.id, username}
}

const sessionSecret = process.env.SESSION_SECRET

if(!sessionSecret) {
    throw new Error("SESSION_SECRET must be set")
}

const storage = createCookieSessionStorage({
    cookie: {
      name: "Remix_TodoList_session",
      // normally you want this to be `secure: true`
      // but that doesn't work on localhost for Safari
      // https://web.dev/when-to-use-local-https/
      secure: process.env.NODE_ENV === "production",
      secrets: [sessionSecret],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    },
  });

  export async function createUserSession(userId, redirectTo) {
    const session =  await storage.getSession()
    session.set("userId", userId)
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session)
        }
    })
  }
