'use client';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Graph from './components/Graph';
import Chatbot from './components/Chatbot';
import CryptoPriceCard from './components/Pricecard';
import { ChakraProvider,Box} from '@chakra-ui/react';
import DayNightSlider from './components/Slider';
const DarkModeSwitch = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="p-4">
      <label className="switch">
        <input 
          type="checkbox"
          checked={isDark}
          onChange={() => setIsDark(!isDark)} 
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

const Page = () => {
  return (
    <ChakraProvider>
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <DayNightSlider />

      <div className="my-6">
        <CryptoPriceCard />
      </div>

      <div className="my-6 flex justify-center items-center">
        <Chatbot />
      </div>

      <div className="my-6">
        <Graph />
      </div>

      <Footer />
    </div>
    </ChakraProvider>
  );
};

export default Page;