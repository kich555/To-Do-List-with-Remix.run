import { Box } from '@mantine/core';
import ErrorHandler from '~/pages/errors/ErrorHandler';

export default function TodoErrorContainer({ error }) {
  return (
    <Box sx={{ overflow: 'hidden', borderRadius: '12px' }}>
      <ErrorHandler error={error} />
    </Box>
  );
}
