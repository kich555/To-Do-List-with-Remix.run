import { useState, useEffect } from 'react';
import { Outlet } from '@remix-run/react';
import AuthModal from '~/pages/auth/AuthModal';
import AuthErrorContainer from '~/pages/auth/errors/AuthErrorContainer';

export default function AuthRoute(params) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setOpen(true), 0);
  }, []);

  return (
    <>
      <AuthModal open={open}>
        <Outlet />
      </AuthModal>
    </>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <AuthModal open={true}>
      <AuthErrorContainer message={error?.message} status={error?.status} />
    </AuthModal>
  );
}
