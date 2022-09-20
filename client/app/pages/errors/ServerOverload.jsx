import { Box, Title, Text, Button, Container, Group } from '@mantine/core';
import { Link, useLocation, useNavigate } from '@remix-run/react';
import serverOverloadStyles from './styles/serverOverloadStyles';

export default function ServerOverload({ error }) {
  // const { status, message, statusText } = error;
  const { pathname } = useLocation();

  const { classes } = serverOverloadStyles(pathname);
  const { root, label, title, description, button } = classes;
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate('.', { replace: true });
  };

  const errorDescription = () => {
    if (error?.message) {
      return error.message;
    }
    if (error?.statusText) {
      return '';
    }
    return 'Our servers could not handle your request. Don&apos;t worry, our development team was already notified. Try refreshing the page.';
  };

  const ErrorButton = () => {
    if (error?.status === 404) {
      return (
        <Button component={Link} to="/" variant="white" size="md" className={button} mb={36}>
          Back to main
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
        <Text size="lg" align="center" color="white" mt={24} className={description}>
          {errorDescription}
        </Text>
        <Group position="center" mt={36}>
          <ErrorButton />
        </Group>
      </Container>
    </Box>
  );
}
