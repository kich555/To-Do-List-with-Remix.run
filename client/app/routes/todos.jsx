import { Link, Outlet } from '@remix-run/react';

export default function TodoRoute() {
  return (
    <section style={{ height: '100vh' }}>
      <Outlet />
    </section>
  );
}
