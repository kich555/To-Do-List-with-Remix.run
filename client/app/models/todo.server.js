import { db } from '../utils/db.server'


export async function getTodos() {
    return db.todo.findMany();
}

export async function getSingleTodo (id) {
    return db.todo.findUnique({where: {id}})
}

export async function updateTodos(todoList) {
    const newTodos =  Object.values(todoList).reduce((acc,cur)=> {
        return [...acc, ...cur]   
    })
    return db.todo.updateMany({})
}

export async function updateSingleTodo ({ _id, description, category }) {
    const result = await db.todo.findUnique({ where: { id: _id } })
    if (_id !== result?.id) return 
    return db.todo.update({
        where: { id: _id },
        data: { description, category }
    })
}

export async function createTodo({ title, progress, category, index }) {
    return db.todo.create({ data: {
        title,
        description:'',
        done: progress ==='done' ? true: false,
        progress,
        category,
        index
    }})
}

export async function deleteTodo({ _id }) {
    const result = await db.todo.findUnique({ where: { id: _id } })
    if (_id !== result?.id) return 
    return db.todo.delete({
        where: { id: _id }
    })
}