'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Flex, Metric, Text } from '@tremor/react';

const CryptoPriceCard = () => {
  const [prices, setPrices] = useState({
    XTZ: 0,
    CTez: 0,
    USDT: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching the price data from CoinGecko API for XTZ, CTez, and USDT
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=tezos,ctez,tether&vs_currencies=usd'
        );

        if (response.data) {
          // Using the API data to update the prices
          setPrices({
            XTZ: response.data.tezos.usd,
            CTez: response.data.ctez ? response.data.ctez.usd : 0, // Assuming the id for CTez on CoinGecko is 'ctez'
            USDT: response.data.tether.usd,
          });
        } else {
          console.error('Aucune donnée de prix trouvée.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de prix :', error);
      }
    };

    // Call the fetchData function when the page loads
    fetchData();
  }, []);

  return (
    <Card className="max-w-lg mx-auto">
      <Flex alignItems="start">
        <div>
          <Text>XTZ Price</Text>
          <Metric>$ {prices.XTZ.toFixed(2)}</Metric>
        </div>
      </Flex>
      <Flex className="mt-4">
        <div>
          <Text>CTez Price</Text>
          <Metric>$ {prices.CTez.toFixed(2)}</Metric>
        </div>
      </Flex>
      <Flex className="mt-4">
        <div>
          <Text>USDT Price</Text>
          <Metric>$ {prices.USDT.toFixed(2)}</Metric>
        </div>
      </Flex>
    </Card>
  );
};

export default CryptoPriceCard;
