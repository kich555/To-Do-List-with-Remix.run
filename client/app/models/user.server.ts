import { db } from '~/utils/db.server';

interface userParams {
  username: string;
  passwordHash: string;
}

export async function createUser({ username, passwordHash }: userParams) {
  return db.user.create({
    data: { username, passwordHash },
  });
}

export async function checkUser(username: string) {
  return db.user.findFirst({
    where: { username },
  });
}

export async function findUser(username: string) {
  return db.user.findUnique({
    where: { username },
  });
}

export async function findUserWithId(userId: string) {
  return db.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true },
  });
}
