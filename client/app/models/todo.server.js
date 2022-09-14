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

export async function updateSingleTodo ({ _id: id, ...data }) {
    const result = await db.todo.findUnique({ where: { id } })
    if (id !== result?.id) return 
    return db.todo.update({ where: { id }, data })
}

export async function createTodo({ ...data }) {
    console.log('data->',data)
    return db.todo.create({ data: {
        ...data, 
        description:'',
        done: data.progress ==='done' ? true: false,
    }})
}

export async function deleteTodo({ _id: id }) {
    const result = await db.todo.findUnique({ where: { id } })
    if (id !== result?.id) return 
    return db.todo.delete({
        where: { id }
    })
}