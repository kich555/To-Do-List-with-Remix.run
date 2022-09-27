import { db } from '~/utils/db.server';

import type { Todo } from '@prisma/client';
import type { prefix } from '~/pages/todos/TodoProgress';

export interface user {
  id: string;
  username: string;
}

export type LiteralTodos = {
  todo?: Todo[];
  inProgress?: Todo[];
  done?: Todo[];
};

function getNewTodos(data: Todo[]) {
  if (data.length === 0) {
    return {};
  } else {
    return data?.reduce((acc: LiteralTodos, cur) => {
      if (!acc[cur.progress as keyof LiteralTodos]) {
        acc[cur.progress as keyof LiteralTodos] = [cur];
      } else {
        acc[cur.progress as keyof LiteralTodos]?.splice(cur.index, 0, cur);
        // acc[cur.progress].push(cur);
      }

      return { ...acc };
    }, {});
  }
}

export async function getUserTodos(user: user) {
  const data = await db.todo.findMany({
    where: { creater: user },
  });
  const todos = getNewTodos(data);
  return todos;
}

export async function getSingleTodo(id: string) {
  return db.todo.findUnique({ select: { id: true, title: true, category: true, description: true }, where: { id } });
}

export async function updateUserTodos(todos: Todo[]) {
  for (const todo of todos) {
    await db.todo.update({
      where: { id: todo.id },
      data: todo,
    });
  }
}

export async function updateSingleTodo({ _id: id, ...data }: { _id: string }) {
  const result = await db.todo.findUnique({ where: { id } });
  if (id !== result?.id) return;
  return db.todo.update({ where: { id }, data });
}

interface CreateTodoParams {
  userId: string;
  progress: string;
  category: string;
  title: string;
  numberIndex: number;
}

export async function createTodo({ userId, progress, category, title, numberIndex }: CreateTodoParams) {
  console.log('numberIndex', numberIndex);
  const todo = {
    createrId: userId,
    title,
    description: '',
    category,
    progress,
    index: numberIndex | 0,
  };

  return db.todo.create({
    data: todo,
  });
}

export async function deleteTodo({ _id: id }: { _id: string }) {
  const todo = await getSingleTodo(id);
  if (id !== todo?.id) return;
  return db.todo.delete({
    where: { id },
  });
}
