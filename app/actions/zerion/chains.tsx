'use server';

import { env } from '@/env';

export interface ZerionChain {
  type: string;
  id: string;
  attributes: {
    external_id: string;
    name: string;
    icon: {
      url: string;
    };
    explorer: {
      name: string;
      token_url_format: string;
      tx_url_format: string;
      home_url: string;
    };
    rpc: {
      public_servers_url: string[] | null;
    };
    flags: {
      supports_trading: boolean;
      supports_sending: boolean;
      supports_bridge: boolean;
    };
  };
  relationships: {
    native_fungible: {
      links: {
        related: string;
      };
      data: {
        type: string;
        id: string;
      };
    };
    wrapped_native_fungible?: {
      links: {
        related: string;
      };
      data: {
        type: string;
        id: string;
      };
    };
  };
  links: {
    self: string;
  };
}

export async function getChains() {
  let data: any;
  try {
    const response = await fetch('https://api.zerion.io/v1/chains/', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Basic ${env.ZERION_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chains');
    }

    data = await response.json();
  } catch (error) {
    console.error('Error fetching chains:', error);
  }

  return {
    data: data.data as ZerionChain[],
  };
}
