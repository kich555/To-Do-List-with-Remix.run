import { Image } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useLocation } from '@remix-run/react';
import { capitalize } from '~/pages/auth/controller/utils/authUtils';
import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';

interface ActionState {
  formError?: string;
}
type ValueType = [boolean, ActionState, React.Dispatch<React.SetStateAction<ActionState>>];

const AuthUXContext = createContext<ValueType>([false, {}, () => {}]);

export function AuthUXProvider({ children }: { children: React.ReactNode }) {
  const [actionData, setActionData] = useState<ActionState>({});
  const { pathname } = useLocation();
  const location = capitalize(pathname.split('/')[2]);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => setOpen(true), 0);
  }, []);
  const value = useMemo(() => [open, actionData, setActionData], [open, actionData]);

  useEffect(() => {
    if (!actionData.formError) return;

    showNotification({
      title: `${location} failed`,
      message: actionData?.formError,
      icon: <Image sx={{ backgroundColor: 'white' }} alt="error-icon" src="https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png" />,
      autoClose: 3000,
    });
  }, [location, actionData]);

  return <AuthUXContext.Provider value={[open, actionData, setActionData]}>{children}</AuthUXContext.Provider>;
}

export function useAuthUX() {
  const authUXContext = useContext(AuthUXContext);

  if (!authUXContext) {
    throw new Error('useAuthUX must be used within a AuthUXProvider');
  }
  return authUXContext;
}
