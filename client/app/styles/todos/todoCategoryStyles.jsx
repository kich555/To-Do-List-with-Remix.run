import { createStyles } from '@mantine/core';

const todoCategoryStyles = createStyles(theme => ({
  wrapper: {
    width: '100%',
    maxHeight: '460px',
    overflowY: 'auto',
  },
  buttonWrapper: {
    display: 'flex',
    gap: '10px',
  },
  createCardInput: {
    width: '100%',
    height: '54px',
    marginBottom: '10px',
    borderRadius: '4px',
  },
}));

export default todoCategoryStyles;
