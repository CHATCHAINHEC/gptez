"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Title, Card } from '@tremor/react';

interface PriceData {
  date: string;
  XTZ: number;
  CTez: number;
  USDT: number;
}

const Graph = () => {
  const [priceData, setPriceData] = useState<PriceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Timestamp for September 14, 2023 at 00:00:00 UTC
        const timestamp = 1689484800;

        const fetchCoinData = async (coin: string) => {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
            {
              params: {
                vs_currency: 'usd',
                from: timestamp,
                to: Math.floor(Date.now() / 1000),
                interval: 'daily',
                days: 30,
              },
            }
          );
          return response.data.prices;
        };

        const [xtzData, ctezData, usdtData] = await Promise.all([
          fetchCoinData('tezos'),
          fetchCoinData('ctez'), // Assuming the id for CTez on CoinGecko is 'ctez'
          fetchCoinData('tether'),
        ]);

        const combinedData: PriceData[] = xtzData.map((item: [number, number], index: number) => ({
          date: new Date(item[0] * 1000).toISOString().split('T')[0],
          XTZ: item[1],
          CTez: ctezData[index] ? ctezData[index][1] : 0,
          USDT: usdtData[index] ? usdtData[index][1] : 0,
        }));

        setPriceData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const valueFormatter = (number: number) =>
    `$${new Intl.NumberFormat('us').format(number)}`;

  return (
    <div>
      {priceData.length > 0 && (
        <Card>
          <Title>Price Over 30 Days (USD)</Title>
          <AreaChart
            className="h-72 mt-4"
            data={priceData}
            index="date"
            categories={["XTZ", "CTez", "USDT"]}
            colors={["blue", "red", "green"]} // Colors for each category
            valueFormatter={valueFormatter}
          />
        </Card>
      )}
    </div>
  );
};

export default Graph;
