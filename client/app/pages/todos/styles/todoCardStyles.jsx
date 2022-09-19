import { createStyles } from '@mantine/core';

const todoCardStyles = createStyles(theme => ({
  item: {
    ...theme.fn.focusStyles(),

    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    overflow: 'hidden',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },
}));

export default todoCardStyles;
