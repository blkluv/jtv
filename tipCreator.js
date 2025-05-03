import { parseEther } from "viem";

export const tipCreator = async (smartAccount, toAddress, amountEth = "0.01") => {
  try {
    const tx = await smartAccount.sendTransaction({
      to: toAddress,
      value: parseEther(amountEth),
    });
    await smartAccount.waitForUserOperationTransaction(tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Tipping failed:", error);
    throw error;
  }
};
