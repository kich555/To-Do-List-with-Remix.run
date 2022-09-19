import { db } from '~/utils/db.server'

export async function checkUser(username) {
    return db.user.findFirst({
        where: { username },
      });
};

export async function findUser(username) {
  return db.user.findUnique({
    where: {username},
  });
};

export async function findUserWithId(userId) {
  return db.user.findUnique({
    where: { id: userId },
    select: { id: true, username: true },
  });
};