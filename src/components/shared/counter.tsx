// src/components/shared/counter.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

// Interface untuk props Counter
interface CounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ count, onIncrement, onDecrement }) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-muted mt-6">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold">Counter Component</h2>
          
          {/* Menampilkan angka dari props */}
          <div className="text-4xl font-mono font-bold text-primary">
            {count}
          </div>
          
          {/* Tombol yang memanggil fungsi dari props */}
          <div className="flex space-x-4">
            <button
              onClick={onIncrement}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-semibold"
            >
              +
            </button>
            <button
              onClick={onDecrement}
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