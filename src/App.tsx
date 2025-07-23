// src/App.tsx
import { Card, CardContent } from "@/components/ui/card";
import { APITester } from "./APITester";
import "@/public/styles/globals.css";
import React, { useState } from "react";
import Counter from './components/shared/counter';

import logo from "@/public/images/logo.svg";
import reactLogo from "@/public/images/react.svg";

export function App() {
  // State untuk counter
  const [count, setCount] = useState<number>(0);

  // Fungsi increment
  const increment = () => {
    setCount(count + 1);
  };

  // Fungsi decrement
  const decrement = () => {
    setCount(count - 1);
  };

  // Fungsi reset
  const reset = () => {
    setCount(0);
  };

  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="flex justify-center items-center gap-8 mb-8">
        <img
          src={logo}
          alt="Bun Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
        />
        <img
          src={reactLogo}
          alt="React Logo"
          className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
        />
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-muted">
        <CardContent className="pt-6">
          <h1 className="text-5xl font-bold my-4 leading-tight">Bun + React</h1>
          <p>
            Edit{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">src/App.tsx</code> and
            save to test HMR
          </p>
          <APITester />
        </CardContent>
      </Card>

      {/* Counter Component */}
      <Counter 
        count={count}
        onIncrement={increment}
        onDecrement={decrement}
      />

      {/* Reset Button */}
      <Card className="bg-card/50 backdrop-blur-sm border-muted mt-4">
        <CardContent className="pt-6">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-semibold"
          >
            Reset Counter
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;