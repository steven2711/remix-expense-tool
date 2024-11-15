// protected route
import ExpenseForm from '~/components/expenses/ExpenseForm';
import Modal from '~/components/util/Modal';
import { useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { updateExpense, deleteExpense } from '~/data/expenses.server';
import { validateExpenseInput } from '~/data/validation.server';

export default function UpdateExpensePage() {
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

export async function action({ params, request }: ActionFunctionArgs) {
  const expenseId = params.id;
  if (!expenseId) {
    throw new Error('Missing expense ID');
  }

  if (request.method === 'DELETE') {
    await deleteExpense(expenseId);
    return redirect('..');
  }

  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const expenseData = {
      title: formData.get('title')?.toString() ?? '',
      amount: +(formData.get('amount')?.toString() ?? '0'),
      date: formData.get('date')?.toString() ?? '',
    };

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect('..');
  }
}
