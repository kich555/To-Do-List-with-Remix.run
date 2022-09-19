import { createStyles } from '@mantine/core';
import { flexCol, centered, pointer } from '~/styles/commonStyles';

const todoDetailStyles = createStyles(theme => ({
  formWrapper: {
    minHeight: '320px',
  },
  updateBox: flexCol,
  editBox: centered,
  badge: pointer,
  descriptionBox: { ...flexCol, ...pointer, justifyContent: 'space-between' },

  buttonGroup: {
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
}));

export default todoDetailStyles;
