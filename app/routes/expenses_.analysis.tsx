// protected route
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import expensesStyles from '~/styles/expenses.css?url';
import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/node';
import { json, useLoaderData, useRouteError } from '@remix-run/react';
import { getExpenses } from '~/data/expenses.server';
import Error from '~/components/util/Error';
import { requireUserSession } from '~/data/auth.server';

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: expensesStyles,
  },
];

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData<typeof loader>();
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'No expenses found' },
      { status: 404, statusText: 'Expenses not found' }
    );
  }

  return expenses;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <Error title={error.statusText}>
      <p>{error.data.message}</p>
    </Error>
  );
}
