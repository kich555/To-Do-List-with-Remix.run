import { Badge, Box, Text } from '@mantine/core';
import { useNavigate } from '@remix-run/react';
import { useModal } from '~/pages/todo/controller/context/TodoModalProvider';
import { Draggable } from 'react-beautiful-dnd';
import todoCardStyles from './styles/todoCardStyles';

export default function TodoCard({ card, index }) {
  const [, dispatch] = useModal();
  const { classes, cx } = todoCardStyles();
  const { item, itemDragging, inner } = classes;
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch({ type: 'OPEN' });
    navigate(`/todos/${card.id}`);
  };

  return (
    <Draggable key={card.id} index={index} draggableId={card.id}>
      {(provided, snapshot) => (
        <Box
          mb="sm"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={cx(item, {
            [itemDragging]: snapshot.isDragging,
          })}
          onClick={handleClick}
        >
          <Box px="xl" py="sm" className={inner}>
            <Text weight={700} size="xl" variant="gradient" gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}>
              {card.title}
            </Text>

            <Text lineClamp={2} mt={8}>
              {card.description}
            </Text>
            <Badge mt={8} color={card.category === 'work' ? 'teal' : 'blue'} sx={{ alignSelf: 'end' }}>
              {card.category}
            </Badge>
          </Box>
          {provided.placeholder}
        </Box>
      )}
    </Draggable>
  );
}
