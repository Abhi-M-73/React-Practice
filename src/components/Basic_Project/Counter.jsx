import React, { useState } from 'react'

const Counter = () => {

    const [count, setCount] = useState(0);
    
    const incrementCount = () => {
        setCount(count+1);
    }

    const decrementCount = () => {
        setCount(count-1);
    }

    return (
        <div>
            <h1 className='text-black text-5xl font-semibold text-center mb-5'>Count : {count}</h1>
            <div className='space-x-3'>
                <button onClick={incrementCount} className='px-5 py-2 rounded bg-green-600 text-white border-none'>Increment</button>
                <button onClick={decrementCount} className='px-5 py-2 rounded bg-indigo-600 text-white border-none'>Decrement</button>
            </div>
        </div>
    )
}

export default Counter
