import { Text } from '@mantine/core';
import { Draggable } from 'react-beautiful-dnd';
import todoCardStyles from '~/styles/todos/todoCardStyles';

export default function TodoCard({ card, index }) {
  const { classes, cx } = todoCardStyles();
  const { item, itemDragging, symbol } = classes;

  return (
    <Draggable key={card.symbol} index={index} draggableId={card.symbol}>
      {(provided, snapshot) => (
        <div
          className={cx(item, {
            [itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Text className={symbol}>{card.symbol}</Text>
          <div>
            <Text>{card.name}</Text>
            <Text color="dimmed" size="sm">
              Position: {card.position} • Mass: {card.mass}
            </Text>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
}
