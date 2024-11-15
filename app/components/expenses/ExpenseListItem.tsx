import { Link, useFetcher } from '@remix-run/react';
import { Expense } from '~/types/types';

export default function ExpenseListItem({ id, title, amount }: Expense) {
  const fetcher = useFetcher();

  function deleteExpenseHandler() {
    fetcher.submit(null, { method: 'delete', action: `/expenses/${id}` });
  }

  if (fetcher.state !== 'idle') {
    return (
      <article className="expense-item locked">
        <p>Deleting...</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseHandler}>Delete</button>
        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}
