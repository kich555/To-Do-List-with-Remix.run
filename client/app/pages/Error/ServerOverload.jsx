import { Box, Title, Text, Button, Container, Group } from '@mantine/core';
import serverOverloadStyles from './styles/serverOverloadStyles';

export default function ServerOverload() {
  const { theme, classes } = serverOverloadStyles();
  const { root, label, title, description } = classes;
  return (
    <Box className={root}>
      <Container>
        <Text align="center" weight={900} className={label}>
          500
        </Text>
        <Title align="center" color="white" weight={900} className={title} mt={36}>
          Something bad just happened...
        </Title>
        <Text size="lg" align="center" color="white" mt={24} className={description}>
          Our servers could not handle your request. Don&apos;t worry, our development team was already notified. Try refreshing the page.
        </Text>
        <Group position="center" mt={36}>
          <Button variant="white" size="md">
            Refresh the page
          </Button>
        </Group>
      </Container>
    </Box>
  );
}
