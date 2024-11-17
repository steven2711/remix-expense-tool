// protected route
import { json } from '@remix-run/react';
import { requireUserSession } from '~/data/auth.server';
import { getExpenses } from '~/data/expenses.server';
import type { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserSession(request);
  const expenses = await getExpenses(userId);
  return json(expenses);
}
