import { ActionArgs, ActionFunction, json, redirect } from '@remix-run/node';
import { useCatch, useLoaderData, useParams } from '@remix-run/react';

import { getSingleTodo, deleteTodo, updateSingleTodo } from '~/models/todo.server';
import TodoDetail from '~/pages/todo/TodoDetail';
import TodoErrorContainer from '~/pages/todo/errors/TodoErrorContainer';

import type { LoaderArgs } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { CaughtError } from '~/types/commontypes';

export interface TodoLoaderData {
  id: string;
  title: string;
  category: string;
  description: string;
}

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = params;

  if (!id) {
    throw new Response('User Not Found', {
      status: 404,
      statusText: `User Not Found`,
    });
  }
  const todo = await getSingleTodo(id);

  if (!todo) {
    throw new Response('Todo Not Found', {
      status: 404,
      statusText: `Todo Not Found`,
    });
  }

  return json<TodoLoaderData>({ ...todo });
};

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const { _action, _id, ...values } = Object.fromEntries(formData);

  invariant(typeof _action === 'string', `${_action} must be a string`);
  invariant(typeof _id === 'string', `${_id} must be a string`);

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
  return;
};

export default function $idRoute() {
  const { ...data } = useLoaderData() as TodoLoaderData;

  return <TodoDetail todo={data} />;
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();

  const error = { ...caught, ...{ name: caught.data.name || '', message: `Todo id : ${params.id} does not exist.` } };

  if (caught.status === 404) {
    return <TodoErrorContainer error={error} />;
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: CaughtError }) {
  return <TodoErrorContainer error={error} />;
}
