import React from "react";
import { Analytics } from "@vercel/analytics/react";
import Reels from "./components/Reels";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Reels />
        <Analytics />
      </div>
    </QueryClientProvider>
  );
}

export default App;
