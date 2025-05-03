import React from "react";
import Reels from "./components/Reels";
import { AccountKitProvider } from "@account-kit/react";

const config = {
  dapps: [
    {
      appName: "JERSEY.FM",
      appUrl: "https://tv.jersey.fm",
    },
  ],
  network: "mainnet", // or "sepolia" for testnet
  walletConnectProjectId: "your_walletconnect_project_id", // replace this
};

function App() {
  return (
    <AccountKitProvider config={config}>
      <div className="App">
        <Reels />
      </div>
    </AccountKitProvider>
  );
}

export default App;
