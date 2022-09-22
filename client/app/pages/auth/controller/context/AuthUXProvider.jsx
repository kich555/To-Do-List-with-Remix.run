import { Image } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import { useState, useEffect, useMemo, createContext, useContext } from 'react';

const AuthUXContext = createContext();

export function AuthUXProvider(props) {
  const [actionData, setActionData] = useState({});

  const [open, setOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => setOpen(true), 0);
  }, []);

  const value = useMemo(() => [open, actionData, setActionData], [open, actionData]);

  useEffect(() => {
    if (!actionData.formError) return;

    showNotification({
      title: 'Register failed',
      message: actionData?.formError,
      icon: <Image sx={{ backgroundColor: 'white' }} loading="lazy" decoding="async" alt="error-icon" src="https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png" />,
      autoClose: 3000,
    });
  }, [actionData]);

  return <AuthUXContext.Provider value={value} {...props} />;
}

export function useAuthUX() {
  const authUXContext = useContext(AuthUXContext);

  if (!authUXContext) {
    throw new Error('useAuthUX must be used within a AuthUXProvider');
  }
  return authUXContext;
}
