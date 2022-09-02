import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import { Link } from '@remix-run/react';
import mainStyles from '~/styles/main';

export default function MainRoute() {
  const { classes } = mainStyles();
  const { container, title, description, control } = classes;
  return (
    <div>
      <Overlay
        gradient='linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 100%)'
        opacity={1}
        zIndex={0}
      />
      <Container className={container}>
        <Title className={title}>
          Create your own Todo list with{' '}
          <Text
            component='span'
            inherit
            variant='gradient'
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Remix.run
          </Text>
          {' / '}
          <Text
            component='span'
            inherit
            variant='gradient'
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Mantine
          </Text>{' '}
        </Title>
        <Text className={description} size='xl' weight={500} mt='xl'>
          Build fully functional accessible web applications faster than ever –
          These stacks are the ones I'm having fun with these days! Make your
          own website easily and quickly!
        </Text>

        <Button
          component={Link}
          to='/todos'
          variant='gradient'
          size='xl'
          radius='xl'
          className={control}
        >
          Get started
        </Button>
      </Container>
    </div>
  );
}
//
