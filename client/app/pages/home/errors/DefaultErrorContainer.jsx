import { useTheme } from '@emotion/react';
import { Box } from '@mantine/core';
import ServerOverload from '~/pages/errors/ServerOverload';

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
      <ServerOverload error={error} />
    </Box>
  );
}
