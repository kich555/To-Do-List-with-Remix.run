import { Group } from '@mantine/core';
import { useState } from 'react';
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';
import TodoCategory from '~/components/pages/todos/TodoCategory';

export default function TodoList({ data }) {
  resetServerContext();

  const category = ['todo', 'inProgress', 'done'];
  const lists = {
    todo: [
      {
        position: 6,
        mass: 12.011,
        symbol: 'C',
        name: 'Col1Test1',
      },
      {
        position: 7,
        mass: 14.007,
        symbol: 'N',
        name: 'Col1Test2',
      },
      {
        position: 39,
        mass: 88.906,
        symbol: 'Y',
        name: 'Col1Test3',
      },
      {
        position: 56,
        mass: 137.33,
        symbol: 'Ba',
        name: 'Col1Test4',
      },
      {
        position: 58,
        mass: 140.12,
        symbol: 'Ce',
        name: 'Col1Test5',
      },
    ],
    inProgress: [
      {
        position: 6,
        mass: 12.011,
        symbol: 'Z',
        name: 'Col2Test1',
      },
      {
        position: 7,
        mass: 14.007,
        symbol: 'T',
        name: 'Col2Test2',
      },
      {
        position: 39,
        mass: 88.906,
        symbol: 'V',
        name: 'Col2Test3',
      },
      {
        position: 56,
        mass: 137.33,
        symbol: 'TK',
        name: 'Col2Test4',
      },
      {
        position: 58,
        mass: 140.12,
        symbol: 'IJ',
        name: 'Col2Test5',
      },
    ],
    done: [
      {
        position: 56,
        mass: 137.33,
        symbol: 'LL',
        name: 'Col3Test1',
      },
      {
        position: 58,
        mass: 140.12,
        symbol: 'PP',
        name: 'Col3Test2',
      },
    ],
  };

  const removeFormList = (list, index) => {
    const result = [...list];
    const [removed] = result.splice(index, 1);
    return [result, removed];
  };

  const addToList = (list, index, element) => {
    const result = [...list];
    result.splice(index, 0, element);
    return result;
  };

  const [todoList, setTodoList] = useState(lists);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    const copiedList = { ...todoList };

    //드래그 시작한 카테고리 리스트
    const sourceCategory = copiedList[source.droppableId];
    // 드래그 한 카드를 삭제한 새 배열 반환 + 삭제한 카드 추출
    const [newSourceCategory, removedCard] = removeFormList(
      sourceCategory,
      source.index
    );
    // 기존 배열을 새 배열로 대체
    copiedList[source.droppableId] = newSourceCategory;

    const destinationCategory = copiedList[destination.droppableId];
    copiedList[destination.droppableId] = addToList(
      destinationCategory,
      destination.index,
      removedCard
    );

    setTodoList(copiedList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        {category.map((categoryKey) => (
          <TodoCategory
            key={categoryKey}
            prefix={categoryKey}
            category={todoList[categoryKey]}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
