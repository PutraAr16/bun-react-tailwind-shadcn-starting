import { Card, CardContent } from "@/components/ui/card";
import { APITester } from "./APITester";
import "@/public/styles/globals.css";
import React, { useState } from "react";
import Counter from './components/shared/counter';
import { ProfileCard, RegistrationForm } from './components/shared';
import { profileData } from './data';

import logo from "@/public/images/logo.svg";
import reactLogo from "@/public/images/react.svg";

export function App() {
  // State untuk counter
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

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

      <Card className="bg-card/50 backdrop-blur-sm border-muted mb-8">
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

      {/* Registration Form */}
      <div className="mb-8">
        <RegistrationForm />
      </div>

      {/* ProfileCard Component */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile Card Component</h2>
        <ProfileCard
          name={profileData.name}
          description={profileData.description}
          image={profileData.image}
          socialMedia={profileData.socialMedia}
        />
      </div>

      {/* Counter Component */}
      <Counter 
        count={count}
        onIncrement={increment}
        onDecrement={decrement}
      />

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