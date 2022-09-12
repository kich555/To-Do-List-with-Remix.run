import { createStyles } from '@mantine/core';
import { flexCol, centered } from '../commonStyles';

const todoDetailStyles = createStyles(theme => ({
  descriptionWrapper: {
    minHeight: '320px',
  },

  formWrapper: flexCol,
  centered,
  textArea: {
    width: '100%',
    height: '280px',
  },
  buttonGroup: {
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
}));

export default todoDetailStyles;
