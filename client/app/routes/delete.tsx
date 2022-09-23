import { ActionArgs, redirect } from '@remix-run/node';
import { deleteTodo } from '../models/todo.server';
import invariant from 'tiny-invariant';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const _id = formData.get('_id');
  invariant(typeof _id === 'string', `${_id} must be string`);

  return deleteTodo({ _id });
}

export async function loader() {
  return redirect('/todos');
}
