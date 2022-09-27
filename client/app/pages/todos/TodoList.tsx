import { useRef, useEffect, useCallback, useMemo } from 'react';
import { Form, Outlet, useFetcher, useParams } from '@remix-run/react';
import { Box, Input, Button, Title, Modal } from '@mantine/core';
import { useTheme } from '@emotion/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDropList } from '../todo/controller/hook/useDropList';
import { useModal } from '../todo/controller/context/TodoModalProvider';
import TodoProgress from './TodoProgress';

import type { LiteralTodos, user } from '~/models/todo.server';

export type Progress = ['todo', 'inProgress', 'done'];

interface TodoListProps {
  user: user;
  todos: LiteralTodos;
}

export default function TodoList({ user, todos }: TodoListProps) {
  const fetcher = useFetcher();
  const { open, dispatch, handleClose } = useModal();
  const dropFormRef = useRef<HTMLFormElement>(null);
  const progress: Progress = useMemo(() => ['todo', 'inProgress', 'done'], []);
  const { todoList, arrayedTodoList, handleDragEnd } = useDropList({ progress, todos });
  const theme = useTheme();
  const params = useParams();

  useEffect(() => {
    if (!params.id) {
      return dispatch({ type: 'CLOSE' });
    } else {
      return dispatch({ type: 'OPEN' });
    }
  }, [params.id, dispatch]);

  const handleDrop = useCallback(() => {
    if (todos === todoList) return;
    dropFormRef.current?.submit();
  }, [todos, todoList]);

  useEffect(() => {
    setTimeout(handleDrop, 500);
  }, [arrayedTodoList]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Title align="center" pt={36}>{`Hi ${user?.username}`}</Title>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%' }} py={20}>
          <fetcher.Form ref={dropFormRef} method="post" replace={true} onSubmit={handleSubmit}>
            <Input type="hidden" name="_action" value="drop" />
            <Input type="hidden" name="todos" value={JSON.stringify(arrayedTodoList)} />
          </fetcher.Form>
          {progress.map(progressName => (
            <TodoProgress key={progressName} prefix={progressName} progress={todoList[progressName]} />
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
      <Modal
        transition="rotate-left"
        transitionDuration={300}
        transitionTimingFunction="ease"
        size="lg"
        centered
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={open}
        onClose={handleClose}
      >
        <Outlet />
      </Modal>
    </>
  );
}
