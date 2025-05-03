import { createConfig, cookieStorage } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { sepolia } from "@account-kit/infra";

export const config = createConfig({
  transport: {
    type: "alchemy",
    apiKey: "ALCHEMY_API_KEY", // Replace with your Alchemy API Key
  },
  chain: sepolia,
  ssr: true,
  storage: cookieStorage,
});

export const queryClient = new QueryClient();