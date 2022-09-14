import { Badge, Box, Button, Container, Group, Input, Text, Textarea, Title } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { Form, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TodoCard from '~/components/pages/todos/TodoCard';
import todoProgressStyles from '~/styles/todos/todoProgressStyles';

export default function TodoProgress({ progress, prefix }) {
  const [isClicked, setIsClicked] = useState(false);
  const [category, setCategory] = useState('life');
  const { classes } = todoProgressStyles();
  const { wrapper, createCardInput, badge } = classes;
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({ duration: 0 });
  const cards = progress.map((card, index) => <TodoCard key={card.id} card={card} index={index} onClick />);

  const submit = useSubmit();

  const handleCreateTodo = event => {
    const formData = new FormData(event.currentTarget);
    setIsClicked(false);
    return submit(formData, { method: 'post' });
  };

  return (
    <Container size={300} px={20} m={0} sx={{ width: '100%' }}>
      <Droppable droppableId={prefix} direction="vertical">
        {provided => (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            <Title align="center" mb={20}>
              {prefix}
            </Title>
            <Box ref={scrollableRef} className={wrapper}>
              {cards}
              {provided.placeholder}
              <div ref={targetRef} />
            </Box>
            <Box mt={20} sx={{ width: '100%' }}>
              {isClicked ? (
                <Form method="post" onSubmit={handleCreateTodo}>
                  <Textarea placeholder="Enter a title for this card..." name="title" className={createCardInput} />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} pt={12}>
                    <Badge variant={category === 'life' ? 'filled' : 'light'} className={badge} onClick={() => setCategory('life')}>
                      life
                    </Badge>
                    <Badge color="teal" variant={category === 'work' ? 'filled' : 'light'} className={badge} ml={8} onClick={() => setCategory('work')}>
                      work
                    </Badge>
                  </Box>
                  <Input type="hidden" name="progress" value={prefix} />
                  <Input type="hidden" name="index" value={progress.length} />
                  <Input type="hidden" name="category" value={category} />
                  <Group spacing={10} noWrap={true} mt={20}>
                    <Button type="submit">Add Card</Button>
                    <Button type="button" color="red" onClick={() => setIsClicked(false)}>
                      Cancel
                    </Button>
                  </Group>
                </Form>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    setIsClicked(true);
                    scrollIntoView();
                  }}
                >
                  <Text component="span">+ Add a card</Text>
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Droppable>
    </Container>
  );
}
