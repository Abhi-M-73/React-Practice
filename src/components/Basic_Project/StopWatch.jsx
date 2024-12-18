import React, { useRef, useState } from 'react';

const StopWatch = () => {

    const [timer, setTimer] = useState(0);
    const intervalRef = useRef(null);

    const handleStartTimer = () => {
        intervalRef.current = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 100);
    }

    const handleStopTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    const handleResetTimer = () => {
        handleStopTimer();
        setTimer(0)
    }

    return (
        <div className="flex flex-col items-center justify-center bg-gray-900 p-10 rounded-lg">
            <h1 className="text-white text-6xl font-bold mb-10 shadow-lg">
                Timer: <span className="text-indigo-400">{timer}</span>
            </h1>
            <div className="space-x-5">
                <button onClick={handleStartTimer} className="w-36 px-5 py-2 rounded-lg bg-green-600 text-white text-lg font-semibold shadow hover:bg-green-500 transition">
                    Start
                </button>
                <button onClick={handleStopTimer} className="w-36 px-5 py-2 rounded-lg bg-red-600 text-white text-lg font-semibold shadow hover:bg-red-500 transition">
                    Stop
                </button>
                <button onClick={handleResetTimer} className="w-36 px-5 py-2 rounded-lg bg-indigo-600 text-white text-lg font-semibold shadow hover:bg-indigo-500 transition">
                    Reset
                </button>
            </div>
        </div>
    );
};

export default StopWatch;
