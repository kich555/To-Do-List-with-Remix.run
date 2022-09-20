import { Box, Button } from '@mantine/core';
import todoDetailStyles from '~/pages/todo/styles/todoDetailStyles';

export default function DefaultDescriptionContainer({ description, setEditDescription }) {
  const { classes, cx } = todoDetailStyles();
  const { formWrapper, descriptionBox, editBox } = classes;

  const handleClick = () => {
    setEditDescription(true);
  };

  if (description) {
    return (
      <Box mt={24} className={cx(formWrapper, descriptionBox)} onClick={handleClick}>
        {description}
        <Button>Edit</Button>
      </Box>
    );
  } else {
    return (
      <Box mt={24} className={cx(formWrapper, editBox)}>
        <Button onClick={handleClick}>Edit</Button>
      </Box>
    );
  }
}
