'use server';

import { env } from '@/env';

interface FungibleInfoImplementation {
  chain_id: string;
  address: string;
  decimals: number;
}

interface FungibleInfoFlags {
  verified: boolean;
}

interface FungibleInfoIcon {
  url: string;
}

interface FungibleInfo {
  name: string;
  symbol: string;
  icon: FungibleInfoIcon;
  flags: FungibleInfoFlags;
  implementations: FungibleInfoImplementation[];
}

interface Quantity {
  int: string;
  decimals: number;
  float: number;
  numeric: string;
}

interface Fee {
  fungible_info: FungibleInfo;
  quantity: Quantity;
  price: number;
  value: number;
}

interface Transfer {
  fungible_info: FungibleInfo;
  direction: string;
  quantity: Quantity;
  value: number;
  price: number;
  sender: string;
  recipient: string;
}

interface ApplicationMetadata {
  contract_address: string;
}

interface Flags {
  is_trash: boolean;
}

interface Attributes {
  operation_type: string;
  hash: string;
  mined_at_block: number;
  mined_at: string;
  sent_from: string;
  sent_to: string;
  status: string;
  nonce: number;
  fee: Fee;
  transfers: Transfer[];
  approvals: any[];
  application_metadata: ApplicationMetadata;
  flags: Flags;
}

interface ChainData {
  type: string;
  id: string;
}

interface ChainLinks {
  related: string;
}

interface ChainRelationship {
  links: ChainLinks;
  data: ChainData;
}

interface Relationships {
  chain: ChainRelationship;
}

export interface ZerionTransactionType {
  type: string;
  id: string;
  attributes: Attributes;
  relationships: Relationships;
}

export async function getTransactions(address: string) {
  let data: any;
  try {
    const response = await fetch(
      `https://api.zerion.io/v1/wallets/${address}/transactions/?currency=usd&page[size]=100&filter[operation_types]=receive&filter[asset_types]=fungible&filter[trash]=only_non_trash`,
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
    data: data.data as ZerionTransactionType[],
  };
}
