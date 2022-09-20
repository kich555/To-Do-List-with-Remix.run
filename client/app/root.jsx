import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { StylesPlaceholder } from '@mantine/remix';
import Layout from '~/components/Layout';
import resetCSS from '~/styles/reset.css';


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

