import { useState, useEffect } from 'react';
import { Outlet } from '@remix-run/react';
import AuthModal from '~/pages/auth/AuthModal';

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
