import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';  // Importez le composant Image de Next.js
import { useWallet } from "./Web3context";

const Header = () => {
  const { wallet, handleConnectWallet, handleDisconnectWallet } = useWallet();

  const displayWalletAddress = () => {
    if (typeof wallet === 'string') {
      return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
    }
    return "Connect";
  };

  return (
    <header className="py-4 px-8 bg-black">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/../logo.jpeg" alt="GPTez Logo" width={40} height={40} className="mr-4" />  
          <Link href="/">
            <span className="text-white text-3xl font-semibold cursor-pointer mr-4">Vibrant</span>
          </Link>
          {wallet && <span className="text-white text-lg">{displayWalletAddress()}</span>}
        </div>
        
        {wallet ? (
          <Button
            onClick={handleDisconnectWallet}
            colorScheme="blue"
            size="lg"
            color="white"
            _hover={{ color: 'white', backgroundColor: '#3B82F6' }}
            _active={{ color: 'white', backgroundColor: '#1E40AF' }}
          >
            Disconnect Wallet
          </Button>
        ) : (
          <Button
            onClick={handleConnectWallet}
            colorScheme="blue"
            size="lg"
            color="white"
            _hover={{ color: 'white', backgroundColor: '#3B82F6' }}
            _active={{ color: 'white', backgroundColor: '#1E40AF' }}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
