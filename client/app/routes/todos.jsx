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
  const title = formData.get('title');
  const progress = formData.get('progress');
  const category = formData.get('category');
  const index = Number(formData.get('index'));

  if (typeof title !== 'string' || title.length === 0) {
    return json({ errors: { title: 'Title is required' } }, { status: 400 });
  }

  await createTodo({ title, progress, category, index });

  return redirect('/todos');
};

export default function TodosIndexRoute() {
  const { newTodos } = useLoaderData();
  return (
    <section style={{ height: '100vh' }}>
      <TodoList todos={newTodos} />
    </section>
  );
}
