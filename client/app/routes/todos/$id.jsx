import { Badge, Box, Button, Container, Divider, Textarea, Title, Group, Input } from '@mantine/core';
import { json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import { getSingleTodo, deleteTodo, updateSingleTodo } from '~/models/todo.server';
import todoDetailStyles from '~/pages/todos/styles/todoDetailStyles';

export const loader = async ({ params }) => {
  const { id } = params;
  const todo = await getSingleTodo(id);
  return json(todo);
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === 'update') {
    await updateSingleTodo({ ...values });
    return redirect(`/todos/${values._id}`);
  }
  if (_action === 'delete') {
    await deleteTodo({ ...values });
    return redirect('/todos');
  }
};

export default function $idRoute() {
  const { id, title, category, description } = useLoaderData();
  const submit = useSubmit();
  const [todoCategory, setTodoCategory] = useState(category);
  const [editDescription, setEditDescription] = useState(false);
  const { classes, cx } = todoDetailStyles();
  const { formWrapper, descriptionBox, editBox, updateBox, buttonGroup, badge } = classes;

  const handleUpdate = event => {
    const formData = new FormData(event.currentTarget);
    setEditDescription(false);
    return submit(formData, { method: 'patch' });
  };

  function DefaultDescriptionBox() {
    if (description) {
      return (
        <Box mt={24} className={cx(formWrapper, descriptionBox)} onClick={() => setEditDescription(true)}>
          {description}
          <Button>Edit</Button>
        </Box>
      );
    } else {
      return (
        <Box mt={24} className={cx(formWrapper, editBox)}>
          <Button onClick={() => setEditDescription(true)}>Edit</Button>
        </Box>
      );
    }
  }

  function EditDescriptionBox() {
    return (
      <Box mt={24} className={cx(formWrapper, updateBox)}>
        <Form method="patch" onSubmit={handleUpdate}>
          <Box className={updateBox}>
            <Input type="hidden" name="_id" value={id} />
            <Input type="hidden" name="category" value={todoCategory} />
            <Textarea autoFocus autosize minRows={12} variant="unstyled" name="description" />
            <Group spacing={10} noWrap={true} mt={20} className={buttonGroup}>
              <Button type="submit" name="_action" value="update">
                Save
              </Button>
              <Button type="button" color="red" onClick={() => setEditDescription(false)}>
                Cancel
              </Button>
            </Group>
          </Box>
        </Form>
      </Box>
    );
  }

  return (
    <Container>
      <Title align="center">{title}</Title>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} pt={12}>
        <Form method="patch">
          <Badge size="lg" component="button" variant={todoCategory === 'life' ? 'filled' : 'light'} className={badge} onClick={() => setTodoCategory('life')}>
            life
          </Badge>
          <Badge size="lg" component="button" color="teal" variant={todoCategory === 'work' ? 'filled' : 'light'} ml={8} className={badge} onClick={() => setTodoCategory('work')}>
            work
          </Badge>
        </Form>
      </Box>
      <Divider mt={24} />
      {editDescription ? <EditDescriptionBox /> : <DefaultDescriptionBox />}
      <Divider mt={24} />
      <Form method="delete">
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Input type="hidden" name="_id" value={id} />
          <Button type="submit" name="_action" value="delete" mt={20} color="red" aria-label="delete">
            Delete
          </Button>
        </Box>
      </Form>
      {/* <Box >{todoCategory}</Box> */}
    </Container>
  );
}
