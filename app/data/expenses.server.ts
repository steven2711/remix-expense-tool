import { prisma } from './database.server';
import type { ExpenseData } from '~/types/types';

export async function addExpense(expenseData: ExpenseData) {
  try {
    const expense = await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });

    return expense;
  } catch (error) {
    throw new Error('Failed to add expense.');
  }
}

export async function getExpenses() {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: 'desc' },
    });
    return expenses;
  } catch (error) {
    throw new Error('Failed to fetch expenses.');
  }
}

export async function getExpense(id: string) {
  try {
    const expense = await prisma.expense.findFirst({ where: { id } });
    return expense;
  } catch (error) {
    throw new Error('Failed to fetch expense.');
  }
}

export async function updateExpense(id: string, expenseData: ExpenseData) {
  try {
    await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    throw new Error('Failed to update expense.');
  }
}
export async function deleteExpense(id: string) {
  try {
    await prisma.expense.delete({ where: { id } });
  } catch (error) {
    throw new Error('Failed to delete expense.');
  }
}
