import { Badge, Box, Button, Container, Divider, Textarea, Title, Group } from '@mantine/core';
import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { getSingleTodo } from '~/models/todo.server';
import todoDetailStyles from '~/styles/todos/todoDetailStyles';

export const loader = async ({ params }) => {
  const { id } = params;
  const todo = await getSingleTodo(id);
  return json(todo);
};

export default function $idRoute() {
  const { title, category, description } = useLoaderData();
  const [todoCategory, setTodoCategory] = useState(category);
  const [editDescription, setEditDescription] = useState(false);
  const { classes, cx } = todoDetailStyles();
  const { descriptionWrapper, centered, formWrapper, textArea, buttonGroup } = classes;

  return (
    <Container>
      <Title align="center">{title}</Title>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} pt={12}>
        <Badge size="lg" component="button" variant={todoCategory === 'life' ? 'filled' : 'light'} onClick={() => setTodoCategory('life')}>
          life
        </Badge>
        <Badge size="lg" component="button" color="teal" variant={todoCategory === 'work' ? 'filled' : 'light'} ml={8} onClick={() => setTodoCategory('work')}>
          work
        </Badge>
      </Box>
      <Divider mt={24} />
      {description ? (
        <Box mt={24} className={descriptionWrapper}>
          {description}
        </Box>
      ) : (
        <Box mt={24} className={editDescription ? cx(formWrapper, descriptionWrapper) : cx(centered, descriptionWrapper)}>
          {editDescription ? (
            <Form>
              <Box className={formWrapper}>
                <Textarea autoFocus autosize variant="unstyled" styles={{ root: textArea }} />
                <Group spacing={10} noWrap={true} mt={20} className={buttonGroup}>
                  <Button>Save</Button>
                  <Button color="red" onClick={() => setEditDescription(false)}>
                    Cancel
                  </Button>
                </Group>
              </Box>
            </Form>
          ) : (
            <Button onClick={() => setEditDescription(true)}>Edit</Button>
          )}
        </Box>
      )}
      <Divider mt={24} />
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button mt={20} color="red">
          Delete
        </Button>
      </Box>
      {/* <Box >{todoCategory}</Box> */}
    </Container>
  );
}
