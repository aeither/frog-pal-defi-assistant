'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ZerionChain,
  getChains,
  getPortfolio,
  PortfolioType,
} from '../actions/zerion';
import { getTransactions } from '../actions/zerion/transactions';
import PortfolioComponent from '@/components/portfolio/PortfolioComponent';
import { ZerionTransactionType } from '../actions/zerion/transactions';
import Transaction from '@/components/transactions/Transaction';
import { TokenPosition, getTokens } from '../actions/zerion/tokens';
import TokenList from '@/components/tokens/TokenComponent';

export default function Home() {
  const [chains, setChains] = useState<ZerionChain[]>([]);
  const [portfolioData, setPortfolioData] = useState<PortfolioType>();
  const [transactions, setTransactions] = useState<ZerionTransactionType[]>();
  const [addressTokens, setaddressTokens] = useState<TokenPosition[]>();

  const callGetChains = async () => {
    const chains = await getChains();
    setChains(chains.data);
  };

  const callGetPortfolio = async () => {
    const data = await getPortfolio(
      '0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A'
    );
    setPortfolioData(data.data);
  };

  const callGetTransactions = async () => {
    const data = await getTransactions(
      '0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A'
    );
    console.log('🚀 ~ callGetTransactions ~ data:', data);

    setTransactions(data.data);
  };

  const getAddressTokens = async () => {
    const data = await getTokens('0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A');
    console.log('🚀 ~ callGetTransactions ~ data:', data.data);

    setaddressTokens(data.data);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={callGetChains}
      >
        Fetch Chains
      </button>

      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={callGetPortfolio}
      >
        Get Portfolio
      </button>

      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={callGetTransactions}
      >
        Get Transactions
      </button>

      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={getAddressTokens}
      >
        Get Tokens
      </button>

      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => console.log(chains)}
      >
        Log
      </button>

      {chains.length > 0 && (
        <ul className='mt-4'>
          {chains.map((chain) => (
            <li key={chain.id} className='flex items-center gap-2 my-2'>
              <Image
                src={chain.attributes.icon.url}
                alt={chain.attributes.name}
                width={24}
                height={24}
              />
              {chain.attributes.name}
            </li>
          ))}
        </ul>
      )}

      {portfolioData && <PortfolioComponent portfolio={portfolioData} />}

      {transactions && (
        <div className='container mx-auto py-8'>
          {transactions.map((tx) => (
            <Transaction transaction={tx} />
          ))}
        </div>
      )}

      {addressTokens && <TokenList positions={addressTokens} />}
    </div>
  );
}
