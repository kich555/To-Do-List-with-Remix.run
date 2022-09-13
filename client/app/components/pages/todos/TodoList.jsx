import { Box } from '@mantine/core';
import { useEffect, useState } from 'react';
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';
import TodoProgress from '~/components/pages/todos/TodoProgress';

export default function TodoList({ todos }) {
  resetServerContext();
  const progress = ['todo', 'inProgress', 'done'];
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

  const [todoList, setTodoList] = useState(todos);

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const copiedList = { ...todoList };

    //드래그 시작한 카테고리 리스트
    const sourceCategory = copiedList[source.droppableId];
    // 드래그 한 카드를 삭제한 새 배열 반환 + 삭제한 카드 추출
    const [newSourceCategory, removedCard] = removeFormList(sourceCategory, source.index);
    // 기존 배열을 새 배열로 대체
    copiedList[source.droppableId] = newSourceCategory;
    //드래그가 끝난 카테고리 리스트
    const destinationCategory = copiedList[destination.droppableId];
    // 드래그한 아이템을 기존 배열에 추가
    copiedList[destination.droppableId] = addToList(destinationCategory, destination.index, removedCard);
    // 드래그한 아이템의 progress 상태 변경
    removedCard.progress = destination.droppableId;
    // 아이템들의 index값 변경
    progress.map(category => copiedList[category].map((item, currentIndex) => (item.index = currentIndex)));

    setTodoList(copiedList);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box sx={{ display: 'flex', height: '100%' }} py={20}>
        {progress.map(progress => (
          <TodoProgress key={progress} prefix={progress} progress={todoList[progress]} />
        ))}
      </Box>
    </DragDropContext>
  );
}
