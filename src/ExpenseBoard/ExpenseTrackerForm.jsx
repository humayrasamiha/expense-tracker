import { useState } from "react";

const incomeCategories = ["Salary", "Outsourcing", "Bond", "Dividend"];
const expenseCategories = [
  "Education",
  "Food",
  "Health",
  "Bill",
  "Insurance",
  "Tax",
  "Transport",
  "Telephone",
];

function ExpenseTrackerForm({ onAddTransaction, editableTransaction }) {
  const [type, setType] = useState(editableTransaction?.type || "expense");
  const [category, setCategory] = useState(editableTransaction?.category || "");
  const [amount, setAmount] = useState(editableTransaction?.amount || "");
  const [date, setDate] = useState(editableTransaction?.date || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      id: editableTransaction?.id || Date.now(),
      type,
      category,
      amount: parseFloat(amount),
      date,
    };
    onAddTransaction(transaction);

    // Reset form fields
    setType("income");
    setCategory("");
    setAmount("");
    setDate("");
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(""); // Reset category when type changes
  };

  // Function to handle tab switch
  const handleTabClick = (tab) => {
    setType(tab);
  };

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <div
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-90 tab ${
              type === "expense" ? "active" : ""
            }`}
            onClick={() => handleTabClick("expense")}
          >
            Expense
          </div>
          <div
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-90 tab ${
              type === "income" ? "active" : ""
            }`}
            onClick={() => handleTabClick("income")}
          >
            Income
          </div>
        </div>
        {/* Note */}
        {/* Income Categories - Salary, Outsourcing, Bond, Dividend */}
        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoComplete="category-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            >
              <option value="">Select a category</option>
              {type === "income"
                ? incomeCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))
                : expenseCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoComplete="off"
              placeholder={12931}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
              autoComplete="off"
              placeholder={12931}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          {editableTransaction ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default ExpenseTrackerForm;
