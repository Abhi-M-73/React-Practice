import React, { useState } from 'react'

const Counter = () => {

    const [count, setCount] = useState(0);
    const [historyCount, setHistoryCount] = useState([0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const incrementCount = () => {
        const newCount = count + 1;
        const updatedHistory = historyCount.slice(0, currentIndex + 1);
        setHistoryCount([...updatedHistory, newCount]);
        setCurrentIndex(currentIndex + 1);
        setCount(newCount);
    }

    const decrementCount = () => {
        const newCount = count - 1;
        const updatedHistory = historyCount.slice(0, currentIndex + 1);
        setHistoryCount([...updatedHistory, newCount]);
        setCurrentIndex(currentIndex + 1);
        setCount(newCount);
    }

    const undoCount = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            setCount(historyCount[newIndex]);
        }
    }

    const redoCount = () => {
        if (currentIndex < historyCount.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            setCount(historyCount[newIndex]);
        }
    }


    return (
        <div>
            <h1 className='text-black text-5xl font-semibold text-center mb-5'>Count : {count}</h1>
            <div className='space-x-3'>
                <button onClick={incrementCount} className='w-32 px-5 py-2 rounded bg-green-600 text-white border-none'>Increment</button>
                <button onClick={decrementCount} className='w-32 px-5 py-2 rounded bg-indigo-600 text-white border-none'>Decrement</button>
                <button onClick={undoCount} className='w-32 px-5 py-2 rounded bg-teal-600 text-white border-none'>Undo</button>
                <button onClick={redoCount} className='w-32 px-5 py-2 rounded bg-gray-600 text-white border-none'>Redo</button>
            </div>
        </div>
    )
}

export default Counter
