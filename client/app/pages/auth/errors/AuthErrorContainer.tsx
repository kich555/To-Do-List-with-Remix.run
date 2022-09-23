import { Box } from '@mantine/core';
import ErrorHandler from '~/pages/errors/ErrorHandler';
import type { CaughtError } from '~/types/commontypes';

export default function AuthErrorContainer({ error }: { error: CaughtError }) {
  return (
    <Box sx={{ overflow: 'hidden', borderRadius: '12px' }}>
      <ErrorHandler error={error} />
    </Box>
  );
}
