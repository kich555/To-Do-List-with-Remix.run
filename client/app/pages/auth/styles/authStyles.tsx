import { createStyles } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';

const authStyles = createStyles((theme: MantineTheme) => ({
  label: {
    display: 'block',
  },
  input: {
    maxWidth: '240px',
  },
  errorInput: {
    border: '1px solid red',
    borderRadius: '4px',
  },
  errorMessage: {
    height: '14px',
  },
  button: {
    width: '100%',
    maxWidth: '240px',
  },
}));

export default authStyles;
