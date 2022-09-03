import { useLoaderData } from '@remix-run/react';
import TodoList from '~/components/pages/todos/TodoList';

const loader = async () => {};
export default function TodosIndexRoute(params) {
  const data = useLoaderData();
  return <TodoList data={data} />;
}
