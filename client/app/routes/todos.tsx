import { useLoaderData } from '@remix-run/react';
import { ActionArgs, ActionFunction, json, redirect } from '@remix-run/node';
import { createTodo, getUserTodos, updateUserTodos } from '~/models/todo.server';
import { requireUserId, getUser } from '~/utils/session.server';
import TodoList from '~/pages/todos/TodoList';
import ListErrorContainer from '~/pages/todos/errors/ListErrorContainer';
import { TodoModalProvider } from '~/pages/todo/controller/context/TodoModalProvider';

import type { LoaderArgs, LoaderFunction } from '@remix-run/node';
import type { Todo } from '@prisma/client';
import invariant from 'tiny-invariant';
import { CaughtError } from '~/types/commontypes';

interface LoaderData {
  user: Awaited<ReturnType<typeof getUser>>;
  todos: Awaited<ReturnType<typeof getUserTodos>>;
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  // If user is undifined redirect to /auth/login
  if (!user) return redirect('/auth/login');
  const todos = await getUserTodos(user);

  return json<LoaderData>({ user, todos });
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const { _action, ...values } = Object.fromEntries(formData);

  invariant(typeof _action === 'string', `${_action} must be a string`);

  // invariant(typeof values.index === 'string', `Todo must be a object`);

  if (_action === 'create') {
    // values.index type 변경

    // values.index *= 1; <--잠시 꺼둠

    const { title } = values;

    if (typeof title !== 'string' || title.length === 0) {
      return json({ errors: { title: 'Title is required' } }, { status: 400 });
    }

    await createTodo({ userId, ...values });
    // return redirect('/todos');
  }

  if (_action === 'drop') {
    const todos = formData.get('todos');

    invariant(typeof todos === 'string', `${todos} must be a array`);

    const parsedTodos: Todo[] = JSON.parse(todos);
    await updateUserTodos(parsedTodos);
  }
  return redirect('/todos');
};

export default function TodosIndexRoute() {
  const { user, todos } = useLoaderData() as LoaderData;
  return (
    <TodoModalProvider>
      <TodoList user={user} todos={todos} />
    </TodoModalProvider>
  );
}

export function ErrorBoundary({ error }: { error: CaughtError }) {
  return <ListErrorContainer error={error} />;
}
