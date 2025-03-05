'use client';

import { useState } from 'react';
import { editExpense, deleteExpense } from '@/actions/actions';

type ExpensesListProps = {
  expenses: {
    id: number;
    description: string;
    amount: number;
    createdAt: Date;
  }[];
};

export default function ExpensesList({ expenses }: ExpensesListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleEditClick = (expense: {
    id: number;
    description: string;
    amount: number;
  }) => {
    setEditingId(expense.id);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
  };

  const handleSaveClick = async (id: number) => {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('amount', amount);

    await editExpense(formData, id);
    setEditingId(null);
  };

  return (
    <ul className='h-[300px] bg-white rounded mt-4 shadow-md'>
      {expenses.map(expense => (
        <li key={expense.id} className='flex items-center px-4 py-2 border-b'>
          {editingId === expense.id ? (
            <>
              <input
                type='text'
                value={description}
                onChange={e => setDescription(e.target.value)}
                className='border p-1'
              />
              <input
                type='number'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className='border p-1 ml-2'
              />
              <button
                onClick={() => handleSaveClick(expense.id)}
                className='ml-2 bg-blue-500 text-white px-2 py-1 rounded'
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p>{expense.description}</p>
              <p className='ml-auto font-bold mr-[15px]'>${expense.amount}</p>
              <button
                onClick={() => handleEditClick(expense)}
                className='bg-yellow-400 hover:bg-yellow-500 transition text-white flex items-center justify-center text-center text-xs px-2 py-1 rounded ml-2 w-8 h-5'
              >
                Edit
              </button>
              <button
                onClick={async () => {
                  await deleteExpense(expense.id);
                }}
                className='bg-red-500 text-white rounded hover:bg-red-600 transition text-xs h-5 w-5 ml-2'
              >
                X
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
