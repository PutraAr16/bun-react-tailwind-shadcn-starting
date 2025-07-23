  // src/components/shared/Counter.tsx
import React, { useState } from 'react';

const Counter: React.FC = () => {
  // State untuk menyimpan nilai counter
const [count, setCount] = useState<number>(0);

  // Fungsi untuk increment
const increment = () => {
    setCount(count + 1);
};

  // Fungsi untuk decrement
const decrement = () => {
    setCount(count - 1);
};

return (
    <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Counter</h2>
    
      {/* Menampilkan angka */}
    <div className="text-4xl font-mono font-bold text-blue-600">
        {count}
    </div>
    
      {/* Tombol increment dan decrement */}
    <div className="flex space-x-4">
        <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
            +
        </button>
        <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
            -
        </button>
    </div>
    </div>
    );
};

export default Counter;