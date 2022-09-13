import { redirect } from '@remix-run/node';
import { deleteTodo } from '../models/todo.server';

export async function action({ request }) {
  const formData = await request.formData();
  const id = formData.get('id');
  return deleteTodo(id);
}

export async function loader() {
  return redirect('/todos');
}
