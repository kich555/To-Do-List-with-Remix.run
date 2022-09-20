import { Box } from '@mantine/core';
import ServerOverload from '~/pages/errors/ServerOverload';

export default function ListErrorContainer({ message, status }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <Box sx={{ overflow: 'hidden', borderRadius: '12px' }}>
        <ServerOverload message={message} status={status} />
      </Box>
    </Box>
  );
}
