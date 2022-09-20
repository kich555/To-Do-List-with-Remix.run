import { Box } from '@mantine/core';
import ServerOverload from '~/pages/errors/ServerOverload';

export default function AuthErrorContainer({ message, status }) {
  return (
    <Box sx={{ overflow: 'hidden', borderRadius: '12px' }}>
      <ServerOverload message={message} status={status} />
    </Box>
  );
}
