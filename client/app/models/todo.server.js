import { db } from '../utils/db.server'


export async function getTodos() {
    return db.todo.findMany();
}