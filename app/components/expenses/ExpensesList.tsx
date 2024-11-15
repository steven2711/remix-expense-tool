import ExpenseListItem from './ExpenseListItem';
import { Expense } from '~/types/types';

export default function ExpensesList({ expenses }: { expenses: Expense[] }) {
  return (
    <ol id="expenses-list">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseListItem
            id={expense.id}
            title={expense.title}
            amount={expense.amount}
          />
        </li>
      ))}
    </ol>
  );
}
