import { createConfig, cookieStorage } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { sepolia } from "@account-kit/infra";
import { createConfig, cookieStorage } from "@account-kit/react";
import config from './config.ts';
function getRequiredEnvVar(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Use CRA-compatible env variable names
const alchemyApiKey = getRequiredEnvVar('REACT_APP_ALCHEMY_API_KEY');
const accountKitApiKey = process.env.REACT_APP_ACCOUNT_KIT_API_KEY; // Optional

// Create and export the config
export const config = createConfig({
  transport: {
    type: "alchemy",
    apiKey: alchemyApiKey,
  },
  chain: sepolia,
  ssr: true,
  storage: cookieStorage,
  ...(accountKitApiKey && { apiKey: accountKitApiKey }), // Conditionally add if exists
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
