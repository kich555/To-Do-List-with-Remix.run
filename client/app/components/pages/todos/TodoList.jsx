import { Box, Input, Button, Title, Space } from '@mantine/core';
import { Form } from '@remix-run/react';
import { useEffect, useCallback, useState, useRef, useMemo } from 'react';
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';
import TodoProgress from '~/components/pages/todos/TodoProgress';

/**
    * @author Kich555 <hyunjjang199582@gmail.com>
원래라면 순수함수들은 utils directory에 모듈로 따로 빼두거나 lodash/es등을 사용하겠지만,
개인 미니 프로젝트 + 다른 곳에서 재사용 할 예정이 없는 순수 함수 특성 상
 응집도를 위해 TodoList.jsx에 선언 해둠
   */
const removeFormList = (list, index) => {
  const result = [...list];
  const [removed] = result.splice(index, 1);
  return [result, removed];
};

/**
    * @author Kich555 <hyunjjang199582@gmail.com>
원래라면 순수함수들은 utils directory에 모듈로 따로 빼두거나 lodash/es등을 사용하겠지만,
개인 미니 프로젝트 + 다른 곳에서 재사용 할 예정이 없는 순수 함수 특성 상
 응집도를 위해 TodoList.jsx에 선언 해둠
   */
const addToList = (list, index, element) => {
  const result = [...list];
  result.splice(index, 0, element);
  return result;
};

/**
    * @author Kich555 <hyunjjang199582@gmail.com>
원래라면 순수함수들은 utils directory에 모듈로 따로 빼두거나 lodash/es등을 사용하겠지만,
개인 미니 프로젝트 + 다른 곳에서 재사용 할 예정이 없는 순수 함수 특성 상
 응집도를 위해 TodoList.jsx에 선언 해둠
   */
const objectToArray = obj => {
  const arrayedObject = Object.values(obj).reduce((acc, cur) => {
    return [...acc, ...cur];
  });

  return arrayedObject;
};

export default function TodoList({ user, todos }) {
  const [todoList, setTodoList] = useState(todos);
  const dropFormRef = useRef();
  resetServerContext();
  const progress = useMemo(() => ['todo', 'inProgress', 'done'], []);
  const arrayedTodoList = useMemo(() => {
    return objectToArray(todoList);
  }, [todoList]);

  const handleDrop = useCallback(() => {
    if (todos === todoList) return;
    dropFormRef.current?.submit();
  }, [todos, todoList]);

  const handleDragEnd = useCallback(
    ({ destination, source }) => {
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
    },
    [progress, todoList],
  );

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  useEffect(() => {
    handleDrop();
  }, [handleDrop]);

  return (
    <>
      <Title align="center" pt={36}>{`Hi ${user.username}`}</Title>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} py={20}>
          <Form ref={dropFormRef} method="post">
            <Input type="hidden" name="_action" value="drop" />
            <Input type="hidden" name="todoList" value={arrayedTodoList} />
          </Form>
          {progress.map(progress => (
            <TodoProgress key={progress} prefix={progress} progress={todoList[progress]} />
          ))}
        </Box>
      </DragDropContext>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Form action="/logout" method="post">
          <Button color="red" type="submit" my={12}>
            Logout
          </Button>
        </Form>
      </Box>
    </>
  );
}
