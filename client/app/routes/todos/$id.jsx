import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSingleTodo, deleteTodo, updateSingleTodo } from '~/models/todo.server';
import TodoDetail from '~/pages/todo/TodoDetail';

export const loader = async ({ params }) => {
  const { id } = params;
  const todo = await getSingleTodo(id);
  return json(todo);
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === 'update') {
    await updateSingleTodo({ ...values });
    return redirect(`/todos/${values._id}`);
  }
  if (_action === 'delete') {
    await deleteTodo({ ...values });
    return redirect('/todos');
  }
};

export default function $idRoute() {
  const loaderData = useLoaderData();

  return <TodoDetail loaderData={loaderData} />;
}
