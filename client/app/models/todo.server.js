import { db } from '../utils/db.server'


export async function getTodos() {
    return db.todo.findMany();
}

export async function updateTodos(todoList) {
    const newTodos =  Object.values(todoList).reduce((acc,cur)=> {
     return [...acc, ...cur]   
    })
    return db.todo.updateMany({})
}

export async function createTodo({ title, progress, category, index }) {
    return db.todo.create({data: {
        title,
        description:'',
        done: progress ==='done' ? true: false,
        progress,
        category,
        index
    }})
}