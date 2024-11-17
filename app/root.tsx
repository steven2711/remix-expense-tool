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
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
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

export const meta: MetaFunction = () => {
  return [{ title: 'Expense Tracker' }];
};

export function Document({
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
}: {
  children: React.ReactNode;
  title: string;
}) {
  const location = useLocation();
  const isExpensesRoute = location.pathname.startsWith('/expenses');

  return <Document isExpensesRoute={isExpensesRoute}>{children}</Document>;
}

export function ErrorBoundary() {
  const error = useRouteError() as Error;
  console.error('App Error:', error);

  return (
    <Document>
      <main className="error">
        <h1>An error occurred!</h1>
        <p>
          {error.message || 'Something went wrong. Please try again later.'}
        </p>
        <p>
          Back to <Link to="/">safety</Link>
        </p>
      </main>
    </Document>
  );
}

export function loader({ request }: LoaderFunctionArgs) {
  return getUserFromSession(request);
}

export default function App() {
  return <Outlet />;
}
