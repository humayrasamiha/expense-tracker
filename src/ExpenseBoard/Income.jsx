import { useState } from "react";

import SvgIcon from "./SvgIcon";
import SortSvg from "./SortSvg";
import EditSvg from "./EditSvg";
import DeleteSvg from "./DeleteSvg";
import FilterSvg from "./FilterSvg";


  const incomeCategories = ["Salary", "Outsourcing", "Bond", "Dividend"];
  const expenseCategories = ["Education", "Food", "Health", "Bill", "Insurance", "Tax", "Transport", "Telephone"];

 function Income({ transactions, title, type, onEdit, onDelete }) {
  const [show, setShow] = useState(false);
  const [showFilterBtn, setShowFilterBtn] = useState(false);
  const categories = type === "income" ? incomeCategories : expenseCategories; // Relevant categories
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" for low to high, "desc" for high to low

  // Handle checkbox selection
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter transactions based on selected categories
  const filteredTransactions = selectedCategories.length
    ? transactions.filter((t) => selectedCategories.includes(t.category))
    : transactions;

  // Function to sort transactions by amount
  const sortedTransactions = [...filteredTransactions].sort((a, b) =>
    sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
  );

  const handleSortLowToHigh = () => {
    setSortOrder("asc");
  };

  const handleSortHighToLow = () => {
    setSortOrder("desc");
  };

  return (
    <div className="border rounded-md relative">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base">
            <SvgIcon />
          </div>
          {/* Text */}
          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">
              {title}
            </h3>
          </div>
        </div>
        <div>
          {/* Sorting */}
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setShow(!show)}
              >
                <SortSvg />
              </button>
            </div>
            {show ? (
              <div
                className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all ${
                      sortOrder === "asc" ? "text-gray-700" : ""
                    }`}
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                    onClick={handleSortLowToHigh}
                  >
                    Low to High
                  </a>
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all ${
                      sortOrder === "desc" ? "text-gray-700" : ""
                    }`}
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                    onClick={handleSortHighToLow}
                  >
                    High to Low
                  </a>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="filter-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setShowFilterBtn(!showFilterBtn)}
              >
                <FilterSvg />
              </button>
            </div>
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="filter-button"
              tabIndex={-1}
              id="filter-dropdown"
            >
              {showFilterBtn ? (
                
                <div className="py-1" role="none">
                  {categories.map((category) => (
                    <label key={category} className="inline-flex items-center px-4 py-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                      id="filter-option-1"
                    />
                    <span className="ml-2">{category}</span>
                  </label>
                  ))}
                  
                  
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 divide-y">
        {/* Expense Row 1 */}
        {sortedTransactions.length > 0 ? (
          sortedTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between items-center py-2 relative group cursor-pointer"
            >
              <div>
                <h3 className="text-base font-medium leading-7 text-gray-600">
                  {transaction.category}
                </h3>
                <p className="text-xs text-gray-600">{transaction.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                  BDT {transaction.amount.toFixed(2)}
                </p>
                {/* 3 Dots */}
                <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
                  <button
                    className="hover:text-teal-600"
                    role="button"
                    title="Edit Button"
                    onClick={() => onEdit(transaction)}
                  >
                    <EditSvg />
                  </button>
                  <button
                    className="hover:text-red-600"
                    role="button"
                    title="Delete"
                    onClick={() => onDelete(transaction.id)}
                  >
                    <DeleteSvg />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <li>No transactions found.</li>
        )}
      </div>
    </div>
  );
}

export default Income;
