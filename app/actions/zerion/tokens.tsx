'use server';

import { env } from '@/env';

export interface TokenPosition {
  type: string;
  id: string;
  attributes: {
    parent: null;
    protocol: null;
    name: string;
    position_type: string;
    quantity: {
      int: string;
      decimals: number;
      float: number;
      numeric: string;
    };
    value: number | null;
    price: number;
    changes: {
      absolute_1d: number;
      percent_1d: number;
    } | null;
    fungible_info: {
      name: string;
      symbol: string;
      icon: {
        url: string;
      } | null;
      flags: {
        verified: boolean;
      };
      implementations: {
        chain_id: string;
        address: string | null;
        decimals: number;
      }[];
    };
    flags: {
      displayable: boolean;
      is_trash: boolean;
    };
    updated_at: string;
    updated_at_block: number;
  };
  relationships: {
    chain: {
      links: {
        related: string;
      };
      data: {
        type: string;
        id: string;
      };
    };
    fungible: {
      links: {
        related: string;
      };
      data: {
        type: string;
        id: string;
      };
    };
  };
}

export async function getTokens(address: string) {
  let data: any;
  try {
    const response = await fetch(
      `https://api.zerion.io/v1/wallets/${address}/positions/?currency=usd&filter%5Bpositions%5D=only_simple&filter%5Btrash%5D=only_non_trash&sort=value`,
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
    console.log('🚀 ~ getTokens ~ data:', data);
  } catch (error) {
    console.error('Error fetching chains:', error);
  }

  return {
    data: data.data as TokenPosition[],
  };
}
