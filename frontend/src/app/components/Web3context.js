import React, { createContext, useContext, useEffect, useState } from "react";

import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,wallet
} from "../../utils/wallet";

// 2. Créez un contexte
const WalletContext = createContext();
export const useWallet = () => {
  
  const context = useContext(WalletContext);

  if (context === undefined) {
    throw new Error("useWallet doit être utilisé à l'intérieur d'un WalletProvider");
  }

  return context;
};
// 3. Créez un composant fournisseur pour le contexte
export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);

  const handleConnectWallet = async () => {
    const { wallet } = await connectWallet();
    setWallet(wallet);
  };

  const handleDisconnectWallet = async () => {
    const { wallet } = await disconnectWallet();
    setWallet(wallet);
  };

  useEffect(() => {
    const func = async () => {
      const account = await getActiveAccount();
      if (account) {
        setWallet(account.address);
      }
    };
    func();
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, handleConnectWallet, handleDisconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};