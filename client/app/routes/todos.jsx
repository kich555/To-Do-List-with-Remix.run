import { useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import TodoList from '~/components/pages/todos/TodoList';
import { createTodo, getTodos } from '~/models/todo.server';

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

  return json({ newTodos });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === 'create') {
    // values.index type 변경
    values.index *= 1;

    const { title } = values;

    if (typeof title !== 'string' || title.length === 0) {
      return json({ errors: { title: 'Title is required' } }, { status: 400 });
    }

    await createTodo({ ...values });
  }

  if (_action === 'drop') {
    console.log('values', values);
  }
  return redirect('/todos');
};

export default function TodosIndexRoute() {
  const { newTodos } = useLoaderData();
  return <TodoList todos={newTodos} />;
}
