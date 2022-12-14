import { createStyles } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';

const layoutStyles = createStyles((theme: MantineTheme) => ({
  wrapper: {
    position: 'relative',
    minHeight: '100vh',
    backgroundImage: 'url(https://images.unsplash.com/photo-1471922694854-ff1b63b20054?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default function Layout({ children }: { children: React.ReactNode }) {
  const { classes } = layoutStyles();
  const { wrapper } = classes;

  return <section className={wrapper}>{children}</section>;
}
