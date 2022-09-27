import { createStyles } from '@mantine/core';
import type { MantineTheme } from '@mantine/core';

const authStyles = createStyles((theme: MantineTheme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    display: 'block',
  },
  input: {
    maxWidth: '240px',
    margin: 'auto',
  },
  errorInput: {
    border: '1px solid red',
    borderRadius: '4px',
  },
  errorMessage: {
    height: '14px',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    maxWidth: '240px',
    margin: 'auto',
  },
}));

export default authStyles;
