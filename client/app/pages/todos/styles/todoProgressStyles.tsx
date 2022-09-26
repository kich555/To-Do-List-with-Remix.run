import { createStyles } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';

const todoProgressStyles = createStyles((theme: MantineTheme) => ({
  wrapper: {
    width: '100%',
    maxHeight: '464px',
    overflowY: 'auto',
  },
  createCardInput: {
    width: '100%',
    height: '54px',
    marginBottom: '10px',
    borderRadius: '4px',
  },
  badge: {
    cursor: 'pointer',
  },
}));

export default todoProgressStyles;
