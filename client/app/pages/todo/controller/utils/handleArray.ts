import invariant from 'tiny-invariant';
import type { Todo } from '@prisma/client';
import type { LiteralTodos } from '~/models/todo.server';

type RemoveFormList = [result: Todo[], removed: Todo];

export function removeFormList(list: Todo[] | undefined, index: number): RemoveFormList {
  invariant(typeof list === 'object', `${list} must be a array`);

  const result = [...list];
  const [removed] = result.splice(index, 1);
  return [result, removed];
}

export function addToList(list: Todo[], index: number, element: Todo) {
  const result = [...list];
  result.splice(index, 0, element);
  return result;
}

export function objectToArray(obj: LiteralTodos) {
  const arrayedObject = Object.values(obj);
  let array;

  if (arrayedObject.length === 0) {
    array = arrayedObject;
    return array;
  } else {
    array = arrayedObject.reduce((acc, cur) => {
      return [...acc, ...cur];
    });
    return array;
  }
}
