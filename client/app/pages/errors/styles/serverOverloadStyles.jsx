import { createStyles } from '@mantine/core';

const serverOverloadStyles = createStyles((theme, pathname) => ({
  root: {
    // backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
    backgroundColor: theme.colors.gray[6],
  },

  label: {
    lineHeight: 1,
    color: theme.colors[theme.primaryColor][3],
    fontSize: pathname === '/auth' ? 120 : 220,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: pathname === '/auth' ? 32 : 38,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
  },

  button: {
    color: theme.colors[theme.primaryColor][4],
  },
}));

export default serverOverloadStyles;
