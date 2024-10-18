import  { useState } from "react";

import Balance from "./Balance";
import Expense from "./Expense";
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import Income from "./Income";

export default function ExpenseBoard() {

  const [transactions, setTransactions] = useState([]);

  const [editableTransaction, setEditableTransaction] = useState(null); // Track the transaction to edit

  const handleAddTransaction = (transaction) => {
    if (editableTransaction) {
      // If editing, update the transaction
      setTransactions((prev) =>
        prev.map((t) => (t.id === editableTransaction.id ? transaction : t))
      );
      setEditableTransaction(null); // Clear the editable state
    } else {
      // Add new transaction
      setTransactions([...transactions, { ...transaction, id: Date.now() }]);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditableTransaction(transaction); //  selected transaction
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id)); // Delete transaction
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ExpenseTrackerForm onAddTransaction={handleAddTransaction} editableTransaction={editableTransaction} />
        <div className="lg:col-span-2">
          <Balance totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <Income transactions={transactions.filter(t => t.type === 'income')} title="Income" type="income" onEdit={handleEditTransaction} onDelete={handleDeleteTransaction}/>
            <Expense transactions={transactions.filter(t => t.type === 'expense')} title="Expense" type="expense" onEdit={handleEditTransaction} onDelete={handleDeleteTransaction}/>
          </div>
        </div>
      </section>
    </main>
  );
}



