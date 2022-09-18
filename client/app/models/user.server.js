import { db } from '~/utils/db.server'

export async function checkUser(username) {
    return db.user.findFirst({
        where: { username },
      });
}