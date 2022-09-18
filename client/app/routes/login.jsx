import { useState, useEffect } from 'react';
import LoginModal from '~/components/pages/login/LoginModal';

export default function LoginRoute(params) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setOpen(true), 0);
  }, []);

  return (
    <>
      <LoginModal open={open} />
    </>
  );
}
