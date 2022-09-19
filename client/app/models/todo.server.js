import { db } from '~/utils/db.server'


export async function getTodos() {
  return db.todo.findMany();
}

export async function getSingleTodo (id) {
  return db.todo.findUnique({where: {id}})
}

export async function updateTodos(todoList) {

  return db.todo.updateMany({
    where:{},
    data: {}})
}

export async function updateSingleTodo ({ _id: id, ...data }) {
  const result = await db.todo.findUnique({ where: { id } })
  if (id !== result?.id) return 
  return db.todo.update({ where: { id }, data })
}

export async function createTodo({ userId, ...data }) {
  
  return db.todo.create({ data: {
    createrId:userId, 
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