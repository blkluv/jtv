import React from "react";
import Reels from "./components/Reels";
import Hero from "./components/Hero";
import { AccountKitProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { config, queryClient } from "./config"; // ✅ Import from config.ts

function App() {
  return (
    <AccountKitProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <main className="min-h-screen text-white bg-black">
          <Reels />
        </main>
      </QueryClientProvider>
    </AccountKitProvider>
  );
}

export default App;
