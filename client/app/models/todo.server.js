import { db } from '../utils/db.server'


export async function getTodos() {
    return db.todo.findMany();
}

export async function updateTodos(todoList) {
    const newTodos =  Object.values(todoList).reduce((acc,cur)=> {
     return [...acc, ...cur]   
    })
console.log('newTodos',newTodos)
    return db.todo.updateMany({
        
    })
}