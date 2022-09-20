import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { getSingleTodo, deleteTodo, updateSingleTodo } from '~/models/todo.server';
import TodoDetail from '~/pages/todo/TodoDetail';
import TodoErrorContainer from '~/pages/todo/errors/TodoErrorContainer';

export const loader = async ({ params }) => {
  const { id } = params;
  const todo = await getSingleTodo(id);
  return json(todo);
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { _action, _id, ...values } = Object.fromEntries(formData);

  if (_action === 'update') {
    await updateSingleTodo({ _id, ...values });
    return redirect(`/todos/${_id}`);
  }
  if (_action === 'delete') {
    await deleteTodo({ _id });
    return redirect('/todos');
  }

  if (_action === 'categoryUpdate') {
    await updateSingleTodo({ _id, ...values });
    return redirect(`/todos/${_id}`);
  }
};

export default function $idRoute() {
  const loaderData = useLoaderData();
  throw new Error('Testing Error Boundary');
  return <TodoDetail loaderData={loaderData} />;
}

export function ErrorBoundary({ error }) {
  console.log('error', error.status);
  return <TodoErrorContainer message={error?.message} status={error?.status} />;
}
