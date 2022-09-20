import { Box, Title, Text, Button, Container, Group } from '@mantine/core';
import { Link, useLocation, useNavigate } from '@remix-run/react';
import { useMemo } from 'react';
import errorHandlerStyles from './styles/errorHandlerStyles';

export default function ErrorHandler({ error }) {
  const { pathname } = useLocation();
  const { classes } = errorHandlerStyles(pathname);
  const { root, label, title, description, button } = classes;
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate('.', { replace: true });
  };

  const linkTo = useMemo(() => {
    const isTodoRoute = pathname.includes('/todos');
    if (isTodoRoute) return '/todos';
    return '/';
  }, [pathname]);

  const errorDescription = useMemo(() => {
    if (error?.message) {
      return error.message;
    }
    if (error?.statusText) {
      return '';
    }
    return 'Our servers could not handle your request. Try refreshing the page.';
  }, [error.message, error.statusText]);

  const ErrorButton = () => {
    if (error?.status === 404) {
      return (
        <Button component={Link} to={linkTo} variant="white" size="md" className={button} mb={36}>
          {pathname.includes('/todos') ? 'Back to list' : 'Back to main'}
        </Button>
      );
    }
    return (
      <Button type="button" variant="white" size="md" className={button} onClick={handleRefresh} mb={36}>
        Refresh the page
      </Button>
    );
  };

  return (
    <Box className={root}>
      <Container>
        <Text align="center" weight={900} className={label}>
          {error?.status || 500}
        </Text>
        <Title align="center" color="white" weight={900} className={title} mt={36}>
          {error?.statusText || 'Something bad just happened...'}
        </Title>
        <Text size="lg" align="center" color="white" weight={700} mt={24} className={description}>
          {errorDescription}
        </Text>
        <Group position="center" mt={36}>
          <ErrorButton />
        </Group>
      </Container>
    </Box>
  );
}
