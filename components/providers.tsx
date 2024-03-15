'use client';
import { TooltipProvider } from '@/components/ui/tooltip';
import { env } from '@/env';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { WagmiProvider, createConfig, createStorage, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { ThirdwebProvider } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';
import { thirdwebClient } from '@/lib/utils/config';

// if (!env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID)
//   throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not found');
// const NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID =
//   env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

// const config = createConfig(
//   getDefaultConfig({
//     // Your dApps chains
//     chains: [sepolia],
//     transports: {
//       // RPC URL for each chain
//       [sepolia.id]: http(
//         `https://eth-sepolia.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`
//       ),
//     },

//     // Required API Keys
//     walletConnectProjectId: NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

//     // Required App Info
//     appName: 'Your App Name',

//     // Optional App Info
//     appDescription: 'Your App Description',
//     appUrl: 'https://family.co', // your app's url
//     appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)

//     ssr: true,
//   })
// );

// const queryClient = new QueryClient();

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider delayDuration={0}>
        <ThirdwebProvider client={thirdwebClient}>{children}</ThirdwebProvider>
      </TooltipProvider>
    </NextThemesProvider>
  );
}

// export function Providers({ children, ...props }: ThemeProviderProps) {
//   return (
//     <NextThemesProvider {...props}>
//       <TooltipProvider delayDuration={0}>
//         <WagmiProvider config={config}>
//           <QueryClientProvider client={queryClient}>
//             <ConnectKitProvider>{children}</ConnectKitProvider>
//           </QueryClientProvider>
//         </WagmiProvider>
//       </TooltipProvider>
//     </NextThemesProvider>
//   );
// }
