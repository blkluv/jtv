import { createConfig, cookieStorage } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { sepolia } from "@account-kit/infra";

// Access the Alchemy API key from environment variables
const alchemyApiKey = process.env.ALCHEMY_API_KEY;

if (!alchemyApiKey) {
  throw new Error("Alchemy API key is missing in environment variables");
}

export const config = createConfig({
  transport: {
    type: "alchemy",
    apiKey: alchemyApiKey,  // Use the environment variable
  },
  chain: sepolia,
  ssr: true,
  storage: cookieStorage,
});

export const queryClient = new QueryClient();
