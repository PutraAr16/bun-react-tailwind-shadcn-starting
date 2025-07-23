import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="bg-card/50 backdrop-blur-sm border-muted mt-6">
    <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold">Counter Component</h2>
          
          {/* Menampilkan angka */}
        <div className="text-4xl font-mono font-bold text-primary">
            {count}
        </div>
        
          {/* Tombol increment dan decrement */}
        <div className="flex space-x-4">
            <button
              onClick={increment}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-semibold"
            >
              +
            </button>
            <button
              onClick={decrement}
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-semibold"
            >
              -
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Counter;