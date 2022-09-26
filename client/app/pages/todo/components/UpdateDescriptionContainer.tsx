import { Form, useSubmit } from '@remix-run/react';
import { Box, Button, Group, Input, Textarea } from '@mantine/core';
import todoDetailStyles from '~/pages/todo/styles/todoDetailStyles';

interface UpdateDescriptionContainerProps {
  id: string;
  todoCategory: string;
  setEditDescription: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateDescriptionContainer({ id, todoCategory, setEditDescription }: UpdateDescriptionContainerProps) {
  const submit = useSubmit();
  const { classes, cx } = todoDetailStyles();
  const { formWrapper, updateBox, buttonGroup } = classes;

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    setEditDescription(false);
    return submit(formData, { method: 'patch' });
  };

  return (
    <Box mt={24} className={cx(formWrapper, updateBox)}>
      <Form method="patch" onSubmit={handleUpdate}>
        <Box className={updateBox}>
          <Input type="hidden" name="_id" value={id} />
          <Input type="hidden" name="category" value={todoCategory} />
          <Textarea autoFocus autosize minRows={12} variant="unstyled" name="description" />
          <Group spacing={10} noWrap={true} mt={20} className={buttonGroup}>
            <Button type="submit" name="_action" value="update">
              Save
            </Button>
            <Button type="button" color="red" onClick={() => setEditDescription(false)}>
              Cancel
            </Button>
          </Group>
        </Box>
      </Form>
    </Box>
  );
}
