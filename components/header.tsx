'use client';

import Link from 'next/link';

import { ShellIcon } from 'lucide-react';
import { ConnectButton } from 'thirdweb/react';

export function Header() {
  return (
    <header className='sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-20 shrink-0 bg-background/70 dark:bg-opacity-70 backdrop-blur-xl'>
      <span className='inline-flex items-center home-links whitespace-nowrap'>
        <Link href='/'>
          <ShellIcon className='w-5 h-5 sm:h-6 sm:w-6' />
        </Link>
        <div className='w-2 h-2 text-muted-foreground/20'></div>
        <Link href='/'>
          <span className='text-lg font-bold'>Frog Pal</span>
        </Link>
      </span>
      <div className='flex items-center justify-end space-x-2'>
        <ConnectButton
          connectButton={{
            className:
              'opacity-100 hover:opacity-70 transition-all duration-300 py-0 px-0',
            label: 'Connect',
          }}
          detailsButton={{
            className:
              'opacity-100 hover:opacity-70 transition-all duration-300 p-2',
          }}
        />
      </div>
    </header>
  );
}
