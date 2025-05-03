import React from "react";
import Reels from "./components/Reels";
import {
  AlchemyAccountProvider,
  QueryClientProvider,
  QueryClient
} from "@alchemy/aa-react";
import { createSmartAccountClient } from "@alchemy/aa-core";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlchemyAccountProvider
        chain={{ id: 8453, rpcUrl: "https://base-mainnet.g.alchemy.com/v2/wTpMvZ6Hc9jK_HFWd-vOJ37pbbXvzip9" }}
        getSmartAccount={async (provider) => {
          return createSmartAccountClient({
            chain: {
              id: 8453,
              rpcUrl: "https://base-mainnet.g.alchemy.com/v2/wTpMvZ6Hc9jK_HFWd-vOJ37pbbXvzip9"
            },
            owner: provider,
            factoryAddress: "0x7FC8e27d971d7B2eA951FCe62192F6B76dD319B7", // Replace with your factory address
            gasManagerConfig: { policyId: "5a26b700-f5b8-4f9d-83d5-1a36f918827c" } // Replace with your policy id
          });
        }}
      >
        <div className="App">
          <Reels />
        </div>
      </AlchemyAccountProvider>
    </QueryClientProvider>
  );
}

export default App;
