import { Badge, Box, Button, Container, Divider, Title, Input } from '@mantine/core';
import { Form } from '@remix-run/react';
import { useState } from 'react';
import UpdateDescriptionContainer from '~/pages/todo/components/UpdateDescriptionContainer';
import DefaultDescriptionContainer from '~/pages/todo/components/DefaultDescriptionContainer';

import type { TodoLoaderData } from '~/routes/todos/$id';

export default function TodoDetail({ todo }: { todo: TodoLoaderData }) {
  const { id, title, category, description } = todo;
  const [todoCategory, setTodoCategory] = useState(category);
  const [editDescription, setEditDescription] = useState(false);

  const badge = {
    cursor: 'pointer',
  };

  return (
    <Container>
      <Title align="center">{title}</Title>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} pt={12}>
        <Form method="patch">
          <Input type="hidden" name="_id" value={id} />
          <Input type="hidden" name="category" value={todoCategory} />
          <Badge
            size="lg"
            component="button"
            type="submit"
            name="_action"
            value="categoryUpdate"
            sx={badge}
            variant={todoCategory === 'life' ? 'filled' : 'light'}
            onClick={() => setTodoCategory('life')}
          >
            life
          </Badge>
          <Badge
            size="lg"
            component="button"
            type="submit"
            name="_action"
            value="categoryUpdate"
            sx={badge}
            color="teal"
            variant={todoCategory === 'work' ? 'filled' : 'light'}
            ml={8}
            onClick={() => setTodoCategory('work')}
          >
            work
          </Badge>
        </Form>
      </Box>
      <Divider mt={24} />
      {editDescription ? (
        <UpdateDescriptionContainer id={id} todoCategory={todoCategory} setEditDescription={setEditDescription} />
      ) : (
        <DefaultDescriptionContainer description={description} setEditDescription={setEditDescription} />
      )}
      <Divider mt={24} />
      <Form method="delete">
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Input type="hidden" name="_id" value={id} />
          <Button type="submit" name="_action" value="delete" mt={20} color="red" aria-label="delete">
            Delete
          </Button>
        </Box>
      </Form>
    </Container>
  );
}
