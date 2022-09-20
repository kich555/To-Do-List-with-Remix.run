import { json, redirect } from '@remix-run/node';
import { useCatch, useLoaderData, useParams } from '@remix-run/react';

import { getSingleTodo, deleteTodo, updateSingleTodo } from '~/models/todo.server';
import TodoDetail from '~/pages/todo/TodoDetail';
import TodoErrorContainer from '~/pages/todo/errors/TodoErrorContainer';

export const loader = async ({ params }) => {
  const { id } = params;
  const todo = await getSingleTodo(id);

  if (!todo) {
    throw new Response('Todo Not Found', {
      status: 404,
      statusText: `Todo Not Found`,
    });
  }
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
  // throw new Error('Testing Error Boundary');
  return <TodoDetail loaderData={loaderData} />;
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  if (caught.status === 404) {
    return <TodoErrorContainer error={{ message: `Todo id : ${params.id} does not exist.`, ...caught }} />;
  }
  throw new Error(`Unhandled error: ${caught.status}`);
}

export function ErrorBoundary({ error }) {
  return <TodoErrorContainer error={error} />;
}
