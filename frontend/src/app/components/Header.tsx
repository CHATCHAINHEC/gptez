// components/Header.tsx
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import ConnectButton from './ConnectButton';
import DisconnectButton from './DisconnectButton';
const Header = () => {
  return (
    <header className="py-4 px-8 bg-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-white text-3xl font-semibold">GPTez</span>
        </Link>
        <Link href="/wallet">
          <span>
          <Button
          colorScheme="blue" // Utilisez la couleur bleue
          size="lg"
          color="white" // Couleur du texte en blanc
          _hover={{ color: 'white', backgroundColor: '#3B82F6' }} // Style au survol
          _active={{ color: 'white', backgroundColor: '#1E40AF' }} // Style lorsque cliqué
        >
          Connect Wallet
        </Button>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;

