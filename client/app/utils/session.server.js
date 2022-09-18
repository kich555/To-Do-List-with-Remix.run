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