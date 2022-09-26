import { useEffect, useCallback, useState, useMemo } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import { removeFormList, addToList, objectToArray } from '../utils/handleArray';

import type { OnDragEndResponder } from 'react-beautiful-dnd';
import type { LiteralTodos } from '~/models/todo.server';
import type { Progress } from '~/pages/todos/TodoList';

interface UseDropListProps {
  progress: Progress;
  todos: LiteralTodos;
}

// interface UseDropListValue {
//   todoList: LiteralTodos;
//   arrayedTodoList: ;
//   handleDragEnd: OnDragEndResponder;
// }

export function useDropList({ progress, todos }: UseDropListProps) {
  const [todoList, setTodoList] = useState(todos);

  resetServerContext();

  const arrayedTodoList = useMemo(() => objectToArray(todoList), [todoList]);

  const handleDragEnd = useCallback<OnDragEndResponder>(
    ({ destination, source }) => {
      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index) return;

      const copiedList = { ...todoList };

      //드래그 한 카테고리 리스트
      const sourceCategory = copiedList[source.droppableId as keyof LiteralTodos];
      // 드래그 한 카드를 삭제한 새 배열 반환 + 삭제한 카드 추출
      const [newSourceCategory, removedCard] = removeFormList(sourceCategory, source.index);
      // 기존 배열을 새 배열로 대체
      copiedList[source.droppableId as keyof LiteralTodos] = newSourceCategory;
      //드롭 할 카테고리 리스트
      const destinationCategory = copiedList[destination.droppableId as keyof LiteralTodos] || [];
      // 드래그한 아이템을 기존 배열에 추가
      copiedList[destination.droppableId as keyof LiteralTodos] = addToList(destinationCategory, destination.index, removedCard);
      // 드래그한 아이템의 progress 상태 변경
      removedCard.progress = destination.droppableId;
      // 아이템들의 index값 변경

      progress?.map(category => copiedList[category]?.map((item, currentIndex) => (item.index = currentIndex)));

      setTodoList(copiedList);
    },
    [progress, todoList],
  );

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  return { todoList, arrayedTodoList, handleDragEnd };
}
