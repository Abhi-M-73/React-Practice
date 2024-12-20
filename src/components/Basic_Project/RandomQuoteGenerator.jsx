import React, { useState } from 'react';

const RandomQuoteGenerator = () => {
    const [quote, setQuote] = useState("Welcome");

    const quotes = [
        "The best way to predict the future is to create it. - Peter Drucker",
        "Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau",
        "Don't be afraid to give up the good to go for the great. - John D. Rockefeller",
        "I find that the harder I work, the more luck I seem to have. - Thomas Jefferson",
        "Opportunities don't happen. You create them. - Chris Grosser",
        "Don't let the fear of losing be greater than the excitement of winning. - Robert Kiyosaki",
        "If you are not willing to risk the usual, you will have to settle for the ordinary. - Jim Rohn",
        "The road to success and the road to failure are almost exactly the same. - Colin R. Davis",
        "Success is not how high you have climbed, but how you make a positive difference to the world. - Roy T. Bennett",
        "Try not to become a man of success. Rather become a man of value. - Albert Einstein",
    ];


    const generateRandomQuote = () => {
        const randomQuoteNum = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomQuoteNum]);
    }

    return (
        <div className="flex flex-col items-center justify-center p-10 bg-gray-800 text-white rounded-lg">
            <h1 className="text-4xl font-bold text-indigo-400 mb-8 text-center">
                Random Quote Generator
            </h1>
            <button onClick={generateRandomQuote} className="px-8 py-3 rounded-lg bg-indigo-600 text-lg font-semibold shadow-lg hover:bg-indigo-500 transition duration-300">
                Generate Quote
            </button>
            <div className='h-28 bg-gray-700 p-6 rounded-lg shadow-lg w-full max-w-2xl mt-10'>
                <h1 className="text-xl font-medium text-center ">
                    {quote}
                </h1>
            </div>
        </div>
    );
};

export default RandomQuoteGenerator;
