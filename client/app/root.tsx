import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { StylesPlaceholder } from '@mantine/remix';
import Layout from '~/components/Layout';
import resetCSS from '~/styles/reset.css';
import DefaultErrorContainer from '~/pages/home/errors/DefaultErrorContainer';
import type { CaughtError } from './types/commontypes';

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

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

function Document({ children, title = `TodoList` }: DocumentProps) {
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

  const error = { ...caught, ...{ name: caught.data.name || '', message: caught.data.message || '' } };

  return (
    <Document title={`${caught.status} || ${caught.statusText}`}>
      <DefaultErrorContainer error={error} />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: CaughtError }) {
  return (
    <Document title="Something Wrong">
      <DefaultErrorContainer error={error} />
    </Document>
  );
}
