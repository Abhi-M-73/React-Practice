import React, { useEffect, useState } from 'react';

const ExpanseTracker = () => {
  const [expanse, setExpanse] = useState('');
  const [allExpanse, setAllExpanse] = useState([]);

  const savedExpanse = (newExpanse) => {
    localStorage.setItem("Expanse", JSON.stringify(newExpanse));
  }

  useEffect(() => {
    const loadData = JSON.parse(localStorage.getItem("Expanse"))
    setAllExpanse(loadData);
  }, [])

  const handleAddExpanse = (e) => {
    e.preventDefault();
    if (!expanse || isNaN(expanse)) {
      alert('Please enter a valid numeric expense!');
      return;
    }

    const newExpanse = [...allExpanse, expanse]
    setAllExpanse(newExpanse);
    savedExpanse(newExpanse);
    setExpanse('');
  };

  const handleDeleteExpanse = (index) => {
    const filterExpanse = allExpanse.filter((_, i) => i !== index);
    setAllExpanse(filterExpanse);
  };

  return (
    <div className='min-h-screen bg-gray-700 p-10 flex flex-col items-center'>
      <h1 className='text-4xl font-bold text-white mb-8'>Expense Tracker</h1>
      <form className='flex space-x-4 mb-6' onSubmit={handleAddExpanse}>
        <input
          onChange={(e) => setExpanse(e.target.value)}
          type="text"
          name="expanse"
          placeholder="Enter Your Expense"
          value={expanse}
          className='bg-white text-gray-800 py-2 px-4 rounded-lg w-80 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300'
        />
        <button
          type="submit"
          className='px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition'
        >
          Add Expense
        </button>
      </form>
      <div className='w-full max-w-xl space-y-4'>
        {allExpanse.map((item, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-5 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105'
          >
            <h1 className='text-xl font-semibold text-gray-700'>Rs. {item}</h1>
            <button
              onClick={() => handleDeleteExpanse(index)}
              className='px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition'
            >
              Delete
            </button>
          </div>
        ))}
        {allExpanse.length === 0 && (
          <p className='text-center text-white font-medium'>
            No expenses added yet. Start tracking now!
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpanseTracker;
