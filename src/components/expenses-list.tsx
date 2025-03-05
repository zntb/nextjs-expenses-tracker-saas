type ExpensesListProps = {
  expenses: {
    id: number;
    description: string;
    amount: number;
    createdAt: Date;
  }[];
};

const EXPENSES = [
  {
    id: 1,
    description: 'Groceries',
    amount: 50,
    createdAt: new Date(),
  },
  {
    id: 2,
    description: 'Utilities',
    amount: 100,
    createdAt: new Date(),
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ExpensesList({ expenses }: ExpensesListProps) {
  return (
    <ul className='h-[300px] bg-white rounded mt-4 shadow-md'>
      {EXPENSES.map(expense => (
        <li key={expense.id} className='flex items-center px-4 py-2 border-b'>
          <p>{expense.description}</p>
          <p className='ml-auto font-bold mr-[15px]'>${expense.amount}</p>
          <button
            // onClick={async () => {
            //   await deleteExpense(expense.id);
            // }}
            className='text-[10px] h-[20px] w-[20px] bg-red-500 text-white rounded hover:bg-red-600'
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
