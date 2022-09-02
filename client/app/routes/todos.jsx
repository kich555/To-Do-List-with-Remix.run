import { Link, Outlet } from '@remix-run/react';

export default function TodoRoute() {
  return (
    <section style={{ height: '100vh' }}>
      <div>
        <ol style={{ display: 'flex ' }}>
          <Link to='new'>Create Todo</Link>
        </ol>
      </div>
      <div
        style={{
          //   width: '400px',
          height: '100vh',
          backgroundColor: 'gray',
          overflow: 'scroll',
        }}
      >
        <Outlet />
      </div>
    </section>
  );
}
