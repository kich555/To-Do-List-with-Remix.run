import { Box, Button, Container, Text, Textarea, Title } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TodoCard from '~/components/pages/todos/TodoCard';
import todoCategoryStyles from '~/styles/todos/todoCategoryStyles';

export default function TodoCategory({ category, prefix }) {
  const [isClicked, setIsClicked] = useState(false);
  const { classes } = todoCategoryStyles();
  const { wrapper, buttonWrapper, createCardInput } = classes;
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({ duration: 0 });

  const cards = category.map((card, index) => <TodoCard key={card.name} card={card} index={index} />);

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
                <Box>
                  <Textarea placeholder="Enter a title for this card..." className={createCardInput} />
                  <Box mt={20} className={buttonWrapper}>
                    <Button>Add Card</Button>
                    <Button color="red" onClick={() => setIsClicked(false)}>
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Button
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
