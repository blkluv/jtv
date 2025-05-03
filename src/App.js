import React from "react";
import Reels from "./components/Reels";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Reels />
      </div>
    </QueryClientProvider>
  );
}

export default App;
