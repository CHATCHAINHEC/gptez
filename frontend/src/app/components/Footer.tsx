// components/Footer.tsx
import { Button } from '@chakra-ui/react';

const Footer = () => {
  return (
    <footer className="py-4 px-8 bg-black">
      <div className="container mx-auto">
        <p className="text-center text-white">
          Copyright &copy; {new Date().getFullYear()} GPTez. Tous droits réservés.
        </p>
        
      </div>
    </footer>
  );
};

export default Footer;
