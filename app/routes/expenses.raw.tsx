// protected route
import { json } from '@remix-run/react';
import { getExpenses } from '~/data/expenses.server';

export async function loader() {
  const expenses = await getExpenses();
  return json(expenses);
}
