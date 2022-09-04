import { Box, Button, Container, ScrollArea, Text, Textarea, Title } from '@mantine/core';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TodoCard from '~/components/pages/todos/TodoCard';
import todoCategoryStyles from '../../../styles/todos/todoCategoryStyles';

export default function TodoCategory({ category, prefix }) {
  const [isClicked, setIsClicked] = useState(false);
  const { classes } = todoCategoryStyles();
  const { button } = classes;

  const cards = category.map((card, index) => <TodoCard key={card.name} card={card} index={index} />);

  return (
    <Container size={300} px={20} m={0}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%', height: '100%' }}>
        <Title align="center" mb={20}>
          {prefix}
        </Title>
        <Droppable droppableId={prefix} direction="vertical">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={{ width: '100%', overflowY: 'auto' }}>
              {cards}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Box sx={{ width: '100%' }}>
          {isClicked ? (
            <Box>
              <Textarea placeholder="Enter a title for this card..." sx={{ width: '100%', height: '54px', margin: '10px 0', borderRadius: '4px' }} />
              <Box mt={20} sx={{ display: 'flex', gap: '10px' }}>
                <Button>Add Card</Button>
                <Button color="red" onClick={() => setIsClicked(false)}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Button onClick={() => setIsClicked(true)}>
              <Text component="span" className={button}>
                + Add a card
              </Text>
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}
