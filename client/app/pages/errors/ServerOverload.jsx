import { Box, Title, Text, Button, Container, Group } from '@mantine/core';
import { useNavigate } from '@remix-run/react';
import serverOverloadStyles from './styles/serverOverloadStyles';

export default function ServerOverload({ status, message }) {
  const { classes } = serverOverloadStyles();
  const { root, label, title, description, button } = classes;
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate('.', { replace: true });
  };
  return (
    <Box className={root}>
      <Container>
        <Text align="center" weight={900} className={label}>
          {status || 500}
        </Text>
        <Title align="center" color="white" weight={900} className={title} mt={36}>
          Something bad just happened...
        </Title>
        <Text size="lg" align="center" color="white" mt={24} className={description}>
          {message || 'Our servers could not handle your request. Don&apos;t worry, our development team was already notified. Try refreshing the page.'}
        </Text>
        <Group position="center" mt={36}>
          <Button type="button" variant="white" size="md" className={button} onClick={handleRefresh} mb={36}>
            Refresh the page
          </Button>
        </Group>
      </Container>
    </Box>
  );
}
