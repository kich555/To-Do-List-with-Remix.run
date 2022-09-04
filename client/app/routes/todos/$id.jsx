import { Modal } from '@mantine/core';
import { useState } from 'react';

export default function $idRoute() {
  const [opened, setOpened] = useState(true);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Introduce yourself!">
        <div>asfasfsafas</div>
      </Modal>
    </>
  );
}
