import { env } from '@/env';
import { createThirdwebClient, defineChain } from 'thirdweb';
// import { http, createConfig } from 'wagmi';

// export const config = createConfig({
//   chains: [mainnet, sepolia],
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
// });

export const thirdwebClient = createThirdwebClient({
  clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

export const leaderboardAddress = '0xb5c2e15d54fb6acc53e8269eb53f34d00f221101';
export const tokenAddress = '0x5259123c149ae1FcDC5C2741aa05C25e8d8a8812';

export const lineaGoerli = defineChain({
  id: 59140,
  rpc: 'https://rpc.goerli.linea.build',
});

// const lineaChain = defineChain({
//   id: 59144,
//   rpc: 'https://linea.blockpi.network/v1/rpc/public',
// });
