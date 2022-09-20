import { createStyles } from '@mantine/core';

const serverOverloadStyles = createStyles(theme => ({
  root: {
    minHeight: '100vh',
    paddingTop: 80,
    paddingBottom: 120,
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
  },

  label: {
    lineHeight: 1,
    color: theme.colors[theme.primaryColor][3],
    fontSize: 220,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 38,
    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: 'auto',
  },
}));

export default serverOverloadStyles;
