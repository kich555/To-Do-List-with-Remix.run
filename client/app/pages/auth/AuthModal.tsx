import React from 'react';
import { useTheme } from '@emotion/react';
import { Image, Box, Container, Divider, Modal, Title, ActionIcon, Badge } from '@mantine/core';
import { Link, useLocation } from '@remix-run/react';
import { useAuthUX } from './controller/context/AuthUXProvider';

export default function AuthModal({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { open } = useAuthUX();

  return (
    <Modal
      transition="rotate-left"
      transitionDuration={700}
      transitionTimingFunction="ease"
      size="md"
      centered
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.35}
      overlayBlur={1}
      withCloseButton={false}
      opened={open}
      onClose={() => null}
    >
      <Container>
        <Box>
          <Box sx={{ position: 'relative' }}>
            <Title align="center">{pathname.includes('login') ? 'Login' : 'Register'}</Title>
            <ActionIcon component={Link} to="/" size={32} sx={{ position: 'absolute', right: 0, top: 8 }}>
              <Image src="https://img.icons8.com/material-rounded/48/000000/left.png" />
            </ActionIcon>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '200px', margin: 'auto' }} pt={12}>
            <Badge component={Link} to="login" size="lg" sx={{ width: '96px', cursor: 'pointer' }}>
              Login
            </Badge>
            <Badge component={Link} to="register" size="lg" color="teal" sx={{ width: '96px', cursor: 'pointer' }}>
              Register
            </Badge>
          </Box>
        </Box>
        <Divider mt={24} />
        <Box mt={24}>{children}</Box>
      </Container>
    </Modal>
  );
}
