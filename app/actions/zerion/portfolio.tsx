'use server';

import { env } from '@/env';

// Portfolio

interface PositionsDistributionByType {
  wallet: number;
  deposited: number;
  borrowed: number;
  locked: number;
  staked: number;
}

interface PositionsDistributionByChain {
  arbitrum: number;
  aurora: number;
  avalanche: number;
  base: number;
  'binance-smart-chain': number;
  blast: number;
  celo: number;
  ethereum: number;
  fantom: number;
  linea: number;
  optimism: number;
  polygon: number;
  scroll: number;
  'gnosis-chain': number;
  'zksync-era': number;
  zora: number;
  [key: string]: number;
}

interface Total {
  positions: number;
}

interface Changes {
  absolute_1d: number;
  percent_1d: number;
}

interface Attributes {
  positions_distribution_by_type: PositionsDistributionByType;
  positions_distribution_by_chain: PositionsDistributionByChain;
  total: Total;
  changes: Changes;
}

export interface PortfolioType {
  type: string;
  id: string;
  attributes: Attributes;
}

export async function getPortfolio(address: string) {
  let data: any;
  try {
    const response = await fetch(
      `https://api.zerion.io/v1/wallets/${address}/portfolio?currency=usd`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Basic ${env.ZERION_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch chains');
    }

    data = await response.json();
  } catch (error) {
    console.error('Error fetching chains:', error);
  }

  return {
    data: data.data as PortfolioType,
  };
}
