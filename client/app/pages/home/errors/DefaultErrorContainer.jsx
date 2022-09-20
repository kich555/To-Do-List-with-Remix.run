import { useTheme } from '@emotion/react';
import { Box } from '@mantine/core';
import ErrorHandler from '~/pages/errors/ErrorHandler';

export default function DefaultErrorContainer({ error }) {
  const theme = useTheme();
  const root = {
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
