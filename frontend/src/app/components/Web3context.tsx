import { createContext, useContext, useState, ReactNode } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { TempleWallet } from '@temple-wallet/dapp';

const rpcURL = "https://ghostnet.ecadinfra.com/";
type WalletProviderProps = {
  children: ReactNode;
};
type WalletContextType = {
  wallet: string | null;
  handleConnectWallet: () => void;
  handleDisconnectWallet: () => void;
  executeContractFunction: (functionName: string, args: any[]) => Promise<void>;
};

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: WalletProviderProps) {
  const [wallet, setWallet] = useState<string | null>(null);

  const tezos = new TezosToolkit(rpcURL);

  async function handleConnectWallet() {
    if (await TempleWallet.isAvailable()) {
      const templeWallet = new TempleWallet('MyAwesomeDapp');
      await templeWallet.connect('ghostnet');
      const pkh = await templeWallet.getPKH();
      setWallet(pkh);
      tezos.setWalletProvider(templeWallet);  // Setting Temple as the wallet provider for Taquito
    } else {
      console.error("Temple Wallet not available");
    }
  }

  async function executeContractFunction(functionName: string, args: any[]) {
    const contract = await tezos.wallet.at("KT1TM1HZQDtLiPuYhbWYmH68ojeawr3VQw6h");
    const operation = await contract.methods[functionName](...args).send();
    await operation.confirmation();
  }

  function handleDisconnectWallet() {
    setWallet(null);
  }

  return (
    <WalletContext.Provider value={{ wallet, handleConnectWallet, handleDisconnectWallet, executeContractFunction }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
