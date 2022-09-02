import { createStyles, Group, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from 'react-beautiful-dnd';

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
}));

export default function TodosIndexRoute(params) {
  resetServerContext();
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState([
    {
      position: 6,
      mass: 12.011,
      symbol: 'C',
      name: 'Carbon',
    },
    {
      position: 7,
      mass: 14.007,
      symbol: 'N',
      name: 'Nitrogen',
    },
    {
      position: 39,
      mass: 88.906,
      symbol: 'Y',
      name: 'Yttrium',
    },
    {
      position: 56,
      mass: 137.33,
      symbol: 'Ba',
      name: 'Barium',
    },
    {
      position: 58,
      mass: 140.12,
      symbol: 'Ce',
      name: 'Cerium',
    },
  ]);

  const items = state.map((item, index) => (
    <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Text className={classes.symbol}>{item.symbol}</Text>
          <div>
            <Text>{item.name}</Text>
            <Text color='dimmed' size='sm'>
              Position: {item.position} • Mass: {item.mass}
            </Text>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Group spacing={10}>
        <Droppable droppableId='dnd-list' direction='vertical'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ width: '400px' }}
            >
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId='dnd-list' direction='vertical'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ width: '400px' }}
            >
              {items}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Group>
    </DragDropContext>
  );
}
