import { db } from '~/utils/db.server'

export async function checkUser(username) {
    return db.user.findFirst({
        where: { username },
      });
}

export async function findUser(username) {
  return db.user.findUnique({
    where: {username}
})
}