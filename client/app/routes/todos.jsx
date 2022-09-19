import { useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import { createTodo, getUserTodos } from '~/models/todo.server';
import { requireUserId, getUser } from '~/utils/session.server';
import TodoList from '~/pages/todos/TodoList';

export const loader = async ({ request }) => {
  const user = await getUser(request);

  // If user is undifined redirect to /auth/login
  if (!user) return redirect('/auth/login');

  const todos = await getUserTodos(user);
  const newTodos = todos.reduce((acc, cur) => {
    if (!acc[cur.progress]) {
      acc[cur.progress] = [cur];
    } else {
      acc[cur.progress].push(cur);
    }

    return { ...acc };
  }, {});

  return json({ user, newTodos });
};

export const action = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === 'create') {
    // values.index type 변경
    values.index *= 1;

    const { title } = values;

    if (typeof title !== 'string' || title.length === 0) {
      return json({ errors: { title: 'Title is required' } }, { status: 400 });
    }

    await createTodo({ ...values, userId });
  }

  if (_action === 'drop') {
    console.log('values', values);
  }
  return redirect('/todos');
};

export default function TodosIndexRoute() {
  const { user, newTodos } = useLoaderData();
  return <TodoList user={user} todos={newTodos} />;
}
