import {
  Form,
  Link,
  useActionData,
  useMatches,
  useNavigation,
  useParams,
} from '@remix-run/react';
import type { Expense } from '~/types/types';

export default function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData<{ [key: string]: string }>();
  const matches = useMatches();
  const expenses =
    matches.find((match) => match.id === 'routes/expenses')?.data ??
    ([] as Expense[]);
  const params = useParams();
  const expenseData = Array.isArray(expenses)
    ? expenses.find((expense: Expense) => expense.id === params.id)
    : undefined;
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle';

  if (params.id && !expenseData && !validationErrors) {
    return <p>Invalid expense id.</p>;
  }

  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : { title: '', amount: '', date: '' };

  return (
    // Form ensures we redownload
    <Form
      method={params.id ? 'patch' : 'post'}
      className="form"
      id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultValues.date
                ? new Date(defaultValues.date).toISOString().slice(0, 10)
                : ''
            }
          />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save Expense'}
        </button>
        {/* .. means go to the parent route */}
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}
