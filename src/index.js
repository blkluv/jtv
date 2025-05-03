import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import { AlchemyAccountProvider } from "@account-kit/react";
import { config, queryClient } from "./config";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./client"; // ✅ This line is essential

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThirdwebProvider client={client}>
      <AlchemyAccountProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AlchemyAccountProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
