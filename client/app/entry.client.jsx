// import { RemixBrowser } from '@remix-run/react';
// import { hydrate } from 'react-dom';
// import { ClientProvider } from '@mantine/remix';

// hydrate(
//   <ClientProvider>
//     <RemixBrowser />
//   </ClientProvider>,
//   document
// );

import * as React from 'react';
import { ClientProvider } from '@mantine/remix';
import { RemixBrowser } from '@remix-run/react';
import { hydrateRoot } from 'react-dom/client';

function hydrate() {
  React.startTransition(() => {
    hydrateRoot(
      document,
      <ClientProvider>
        <RemixBrowser />
      </ClientProvider>
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
