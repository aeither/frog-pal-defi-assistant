'use client';

import { IconAI, IconUser } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { CircleEllipsisIcon, CopyIcon } from 'lucide-react';

// Different types of message bubbles.

export function UserMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className='group relative flex flex-col items-start md:-ml-12'>
      <div className='flex flex-row w-full justify-between py-2'>
        <div className='flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-background'>
          <IconUser />
        </div>
        <div className='flex h-8 w-8 shrink-0 select-none items-center justify-center'>
          <CircleEllipsisIcon size={'18px'} className='opacity-70' />
        </div>
      </div>
      <div className='flex-1 space-y-2 overflow-hidden px-1'>{children}</div>
    </div>
  );
}

export function BotMessage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'group relative flex flex-col items-start md:-ml-12',
        className
      )}
    >
      <div className='flex flex-row w-full justify-between py-2'>
        <div className='flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground'>
          <IconAI />
        </div>
        <div className='flex h-8 w-8 shrink-0 select-none items-center justify-center'>
          <CopyIcon size={'18px'} className='opacity-70' />
        </div>
      </div>
      <div className='flex-1 space-y-2 overflow-hidden px-1'>{children}</div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: React.ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className='group relative flex flex-col items-start md:-ml-12'>
      <div className='flex flex-row w-full justify-between py-2'>
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground',
            !showAvatar && 'invisible'
          )}
        >
          <IconAI />
        </div>
        <div className='flex h-8 w-8 shrink-0 select-none items-center justify-center'>
          <CopyIcon size={'18px'} className='opacity-70' />
        </div>
      </div>
      <div className='flex-1 px-1'>{children}</div>
    </div>
  );
}

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'mt-2 flex items-center justify-center gap-2 text-xs text-gray-500'
      }
    >
      <div className={'max-w-[600px] flex-initial px-2 py-2'}>{children}</div>
    </div>
  );
}
