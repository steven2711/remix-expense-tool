// protected route
import { Link, Outlet, useLoaderData } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import ExpensesList from '~/components/expenses/ExpensesList';
import expensesStyles from '~/styles/expenses.css?url';
import { FaPlus, FaDownload } from 'react-icons/fa';
import { getExpenses } from '~/data/expenses.server';
import type { Expense } from '~/types/types';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: expensesStyles,
  },
];

export default function ExpensesLayout() {
  const expenses = useLoaderData<typeof loader>();
  const hasExpenses = expenses && expenses.length > 0;
  // on refresh this code runs via server and client. this is due to the server building this page then serveing to the client. but if I where to navigate away from this page and come back, the code will only run in the client.
  // console.log('Expenses layout');
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses as Expense[]} />}
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

export async function loader() {
  const expenses = await getExpenses();
  return expenses;
}
