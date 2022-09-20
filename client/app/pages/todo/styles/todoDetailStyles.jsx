import { createStyles } from '@mantine/core';

const todoDetailStyles = createStyles(theme => ({
  formWrapper: {
    minHeight: '320px',
  },
  updateBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  editBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    cursor: 'pointer',
  },
  descriptionBox: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    justifyContent: 'space-between',
  },

  buttonGroup: {
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
}));

export default todoDetailStyles;
