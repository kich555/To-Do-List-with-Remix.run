import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';
import TodoList from '~/components/pages/todos/TodoList';
import { getTodos } from '~/models/todo.server';

export const loader = async () => {
  const todos = await getTodos();

  const newTodos = todos.reduce((acc, cur) => {
    if (!acc[cur.progress]) {
      acc[cur.progress] = [cur];
    } else {
      acc[cur.progress].push(cur);
    }

    return { ...acc };
  }, {});
  console.log('->', newTodos);

  return json({ newTodos });
};

export default function TodosIndexRoute() {
  const { newTodos } = useLoaderData();
  console.log('todos', newTodos);
  return <TodoList todos={newTodos} />;
}
