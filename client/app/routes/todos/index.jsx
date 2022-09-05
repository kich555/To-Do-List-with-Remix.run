import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import TodoList from '~/components/pages/todos/TodoList';
import { getTodos } from '~/models/todo.server';

export const loader = async () => {
  const todos = await getTodos();

  return json({ todos });
};

export default function TodosIndexRoute() {
  const { todos } = useLoaderData();
  console.log(todos);
  return <TodoList todos={todos} />;
}
