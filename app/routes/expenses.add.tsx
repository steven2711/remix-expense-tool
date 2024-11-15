// protected route
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { useNavigate } from '@remix-run/react';
import { addExpense } from '~/data/expenses.server';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { validateExpenseInput } from '~/data/validation.server';

export default function ExpensesAdd() {
  const navigate = useNavigate();

  function closeModalHandler() {
    navigate('..');
  }

  return (
    <Modal onClose={closeModalHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// for any non GET request on this route
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const expenseData = {
    title: formData.get('title')?.toString() || '',
    amount: +(formData.get('amount')?.toString() || '0'),
    date: formData.get('date')?.toString() || '',
  };

  // user is not redirected and the data is availble for use via useActionData
  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;
  }

  await addExpense(expenseData);
  return redirect('..');
}
