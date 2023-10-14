import { createContext, useContext, useState, ReactNode } from "react";
import { TempleWallet } from '@temple-wallet/dapp';

type WalletContextType = {
  wallet: string | null;
  handleConnectWallet: () => void;
  handleDisconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextType | null>(null);

type WalletProviderProps = {
  children: ReactNode;
};

export function WalletProvider({ children }: WalletProviderProps) {
  const [wallet, setWallet] = useState<string | null>(null);

  async function handleConnectWallet() {
    if (await TempleWallet.isAvailable()) {
      const mywallet = new TempleWallet('MyAwesomeDapp');
      try {
        await mywallet.connect('ghostnet');
        const pkh = await mywallet.getPKH();
        setWallet(pkh);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Temple Wallet not available");
    }
  }

  function handleDisconnectWallet() {
    setWallet(null);
  }

  return (
    <WalletContext.Provider value={{ wallet, handleConnectWallet, handleDisconnectWallet }}>
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
