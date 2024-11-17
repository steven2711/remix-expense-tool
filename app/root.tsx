import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  Link,
  useRouteError,
} from '@remix-run/react';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import MainHeader from '~/components/navigation/MainHeader';
import ExpensesHeader from './components/navigation/ExpensesHeader';

// import './tailwind.css';
import sharedStyles from '~/styles/shared.css?url';
import Error from './components/util/Error';
import { getUserFromSession } from './data/auth.server';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  {
    rel: 'stylesheet',
    href: sharedStyles,
  },
];

export function Document({
  title,
  children,
  isExpensesRoute,
}: {
  title?: string;
  children: React.ReactNode;
  isExpensesRoute?: boolean;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body>
        {isExpensesRoute ? <ExpensesHeader /> : <MainHeader />}
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const location = useLocation();
  const isExpensesRoute = location.pathname.startsWith('/expenses');

  return (
    <Document isExpensesRoute={isExpensesRoute} title={title}>
      {children}
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <main>
      <Error title="An error occurred!">
        {error.message || 'Something went wrong!'}
      </Error>
      <p className="text-center">
        Back to <Link to="/">safety!</Link>
      </p>
    </main>
  );
}

export function loader({ request }: LoaderFunctionArgs) {
  return getUserFromSession(request);
}

export default function App() {
  return <Outlet />;
}
