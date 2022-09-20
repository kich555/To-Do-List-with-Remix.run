import { useRef, useMemo } from 'react';
import { Form } from '@remix-run/react';
import { Box, Input, Button, Title } from '@mantine/core';
import { DragDropContext } from 'react-beautiful-dnd';
import TodoProgress from './TodoProgress';
import useDropList from '../todo/controller/useDropList';

export default function TodoList({ user, todos }) {
  const dropFormRef = useRef();
  const progress = useMemo(() => ['todo', 'inProgress', 'done'], []);
  const [todoList, arrayedTodoList, handleDragEnd] = useDropList({ progress, todos });

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
