type ExpensesListProps = {
  expenses: {
    id: number;
    description: string;
    amount: number;
    createdAt: Date;
  }[];
};

export default function ExpensesList({ expenses }: ExpensesListProps) {
  return (
    <div>
      {expenses.map(expense => (
        <div
          key={expense.id}
          className='bg-white shadow-md rounded-md p-4 mb-4'
        >
          <h2 className='text-lg font-semibold'>{expense.description}</h2>
          <p className='text-gray-600'>${expense.amount}</p>
        </div>
      ))}
    </div>
  );
}
