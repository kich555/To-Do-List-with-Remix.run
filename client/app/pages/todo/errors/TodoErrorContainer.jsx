import { Box } from '@mantine/core';
import ServerOverload from '~/pages/errors/ServerOverload';

export default function TodoErrorContainer({ error }) {
  return (
    <Box sx={{ overflow: 'hidden', borderRadius: '12px' }}>
      <ServerOverload error={error} />
    </Box>
  );
}
