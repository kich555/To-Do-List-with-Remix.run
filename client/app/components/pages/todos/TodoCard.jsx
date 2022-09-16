import { Badge, Box, Modal, Text } from '@mantine/core';
import { Outlet, useNavigate } from '@remix-run/react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import todoCardStyles from '~/styles/todos/todoCardStyles';

export default function TodoCard({ card, index }) {
  const [opened, setOpened] = useState(false);
  const { classes, cx, theme } = todoCardStyles();
  const { item, itemDragging, inner } = classes;
  const navigate = useNavigate();

  const handleClick = () => {
    setOpened(true);
    navigate(`/todos/${card.id}`);
  };

  const handleModalClose = () => {
    setOpened(false);
    navigate('/todos');
  };

  return (
    <>
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
      <Modal
        size="lg"
        centered
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={handleModalClose}
      >
        <Outlet />
      </Modal>
    </>
  );
}
