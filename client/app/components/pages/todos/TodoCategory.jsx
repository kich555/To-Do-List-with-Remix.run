import { Title } from '@mantine/core';
import { Droppable } from 'react-beautiful-dnd';
import TodoCard from '~/components/pages/todos/TodoCard';

export default function TodoCategory({ category, prefix }) {
  console.log('category', category);
  const cards = category.map((card, index) => <TodoCard key={card.name} card={card} index={index} />);

  return (
    <section
      style={{
        width: '280px',
        padding: '0 20px',
      }}
    >
      <Title align="center" mb={20} mt={10}>
        {prefix}
      </Title>
      <Droppable droppableId={prefix} direction="vertical">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={{ width: '100%', height: '100vh', overflowY: 'scroll' }}>
            {cards}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}
