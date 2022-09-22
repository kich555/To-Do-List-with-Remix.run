import { Outlet, useCatch } from '@remix-run/react';
import { AuthUXProvider } from '~/pages/auth/controller/context/AuthUXProvider';
import AuthModal from '~/pages/auth/AuthModal';
import AuthErrorContainer from '~/pages/auth/errors/AuthErrorContainer';

export default function AuthRoute() {
  return (
    <>
      <AuthUXProvider>
        <AuthModal>
          <Outlet />
        </AuthModal>
      </AuthUXProvider>
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
}

export function ErrorBoundary({ error }) {
  return (
    <AuthUXProvider>
      <AuthModal>
        <AuthErrorContainer message={error?.message} status={error?.status} />
      </AuthModal>
    </AuthUXProvider>
  );
}
