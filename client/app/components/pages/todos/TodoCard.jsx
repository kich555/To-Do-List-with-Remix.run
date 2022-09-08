import { Badge, Box, Text } from '@mantine/core';
import { Draggable } from 'react-beautiful-dnd';
import todoCardStyles from '~/styles/todos/todoCardStyles';

export default function TodoCard({ card, index }) {
  const { classes, cx } = todoCardStyles();
  const { item, itemDragging, inner } = classes;

  return (
    <Draggable key={card.title} index={index} draggableId={card.title}>
      {(provided, snapshot) => (
        <Box
          mb="sm"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={cx(item, {
            [itemDragging]: snapshot.isDragging,
          })}
        >
          <Box px="xl" py="sm" className={inner}>
            <Text weight={700} size="xl" variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
              {card.title}
            </Text>

            <Text lineClamp={2} mt={8}>
              {card.description}
            </Text>
            <Badge mt={8} sx={{ alignSelf: 'end' }}>
              {card.category}
            </Badge>
          </Box>
          {provided.placeholder}
        </Box>
      )}
    </Draggable>
  );
}
