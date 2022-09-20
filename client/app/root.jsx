import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { StylesPlaceholder } from '@mantine/remix';
import Layout from '~/components/Layout';
import resetCSS from '~/styles/reset.css';
import DefaultErrorContainer from '~/pages/home/errors/DefaultErrorContainer';

export const links = () => [
  {
    rel: 'stylesheet',
    href: resetCSS,
  },
];

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

function Document({ children, title = `TodoList` }) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <Meta />
        <Links />
        <StylesPlaceholder />
      </head>
      <body>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {children}
          <LiveReload />
        </MantineProvider>
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <NotificationsProvider>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </NotificationsProvider>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} || ${caught.statusText}`}>
      <DefaultErrorContainer error={caught} />
    </Document>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <Document title="Something Wrong">
      <DefaultErrorContainer message={error?.message} status={error?.status} />
    </Document>
  );
}
