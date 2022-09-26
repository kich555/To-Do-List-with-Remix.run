import { useTheme } from '@emotion/react';
import { Box } from '@mantine/core';
import ErrorHandler from '~/pages/errors/ErrorHandler';
import type { CSSObject } from '@mantine/core';
import type { CaughtError } from '~/types/commontypes';

export default function DefaultErrorContainer({ error }: { error: CaughtError }) {
  const theme = useTheme();
  const root: CSSObject = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.colors.gray[6],
  };

  return (
    <Box sx={root}>
      <ErrorHandler error={error} />
    </Box>
  );
}
