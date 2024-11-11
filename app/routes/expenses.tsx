// protected route
import { Outlet } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import expensesStyles from '~/styles/expenses.css?url';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: expensesStyles,
  },
];

export default function ExpensesLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
