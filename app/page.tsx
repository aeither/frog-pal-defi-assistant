'use client';

import { SetStateAction, useEffect, useRef, useState } from 'react';

import { UserMessage } from '@/components/llm-stocks/message';
import { useActions, useUIState } from 'ai/rsc';

import { ChatList } from '@/components/chat-list';
import { EmptyScreen } from '@/components/empty-screen';
import { FooterText } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { IconArrowElbow, IconPlus } from '@/components/ui/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChatScrollAnchor } from '@/lib/hooks/chat-scroll-anchor';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import Textarea from 'react-textarea-autosize';
import { useAccount } from 'wagmi';
import { type AI } from './actions/ai';
import { getAllUsers } from './actions/db';
import dynamic from 'next/dynamic';
import { ArrowUpIcon, MicIcon } from 'lucide-react';
import VoiceButton from '@/components/voice/VoiceButton';
import { useActiveAccount } from 'thirdweb/react';

const BrowserOnlyEmptyScreen = dynamic(
  () => import('../components/empty-screen').then((mod) => mod.EmptyScreen),
  { ssr: false }
);

export default function Page() {
  const account = useActiveAccount();
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  const [inputValue, setInputValue] = useState('');
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // const [purchasingUI, setPurchasingUI] = useState<null | React.ReactNode>(
  //   null
  // );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/') {
        if (
          e.target &&
          ['INPUT', 'TEXTAREA'].includes((e.target as any).nodeName)
        ) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (inputRef?.current) {
          inputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef]);

  const [name, setName] = useState(null);
  // const { address, isConnected } = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      console.log('This runs on the server');
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   async function getUserName() {
  //     const { data, error } = await supabase
  //       .from('users')
  //       .select('name')
  //       .eq('wallet_address', address)
  //       .single();

  //     if (error) {
  //       console.error(error);
  //     } else if (data) {
  //       setName(data.name);
  //     }
  //   }

  //   if (isConnected) {
  //     getUserName();
  //   }
  // }, [isConnected, address]);

  return (
    <div>
      {/* <Button
        onClick={async () => {
          const users = await getAllUsers();
          console.log('🚀 ~ onClick={ ~ users:', users);
        }}
      >
        getAllUsers
      </Button> */}
      <div className='pb-[200px] pt-4 md:pt-10'>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
          </>
        ) : (
          <BrowserOnlyEmptyScreen
            submitMessage={async (message) => {
              // Add user message UI
              setMessages((currentMessages) => [
                ...currentMessages,
                {
                  id: Date.now(),
                  display: <UserMessage>{message}</UserMessage>,
                },
              ]);

              // Submit and get response message
              const responseMessage = await submitUserMessage(
                message +
                  `\n\n Metainfo: address of the user who is asking that may be useful: ${account?.address}`
              );
              setMessages((currentMessages) => [
                ...currentMessages,
                responseMessage,
              ]);
            }}
          />
        )}
        <ChatScrollAnchor trackVisibility={true} />
      </div>
      <div className='fixed inset-x-0 bottom-0 w-full  peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]'>
        <div className='mx-auto sm:max-w-2xl sm:px-4'>
          <div className='px-4 py-2 space-y-4 border-t bg-background/70 backdrop-blur-md sm:rounded-t-xl sm:border md:py-4'>
            <form
              ref={formRef}
              onSubmit={async (e: any) => {
                e.preventDefault();

                // Blur focus on mobile
                if (window.innerWidth < 600) {
                  e.target['message']?.blur();
                }

                const value = inputValue.trim();
                setInputValue('');
                if (!value) return;

                // Add user message UI
                setMessages((currentMessages) => [
                  ...currentMessages,
                  {
                    id: Date.now(),
                    display: <UserMessage>{value}</UserMessage>,
                  },
                ]);

                try {
                  // Submit and get response message
                  const responseMessage = await submitUserMessage(
                    value +
                      `\n\n Metainfo: address of the user who is asking that may be useful: ${account?.address}`
                  );
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                } catch (error) {
                  // You may want to show a toast or trigger an error state.
                  console.error(error);
                }
              }}
            >
              <div className='relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow sm:rounded-md sm:border sm:px-12'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='absolute left-0 w-8 h-8 p-0 rounded-full top-4 bg-background sm:left-4'
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.reload();
                      }}
                    >
                      <IconPlus />
                      <span className='sr-only'>New Chat</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>New Chat</TooltipContent>
                </Tooltip>
                <Textarea
                  ref={inputRef}
                  tabIndex={0}
                  onKeyDown={onKeyDown}
                  placeholder='Send a message.'
                  className='min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm'
                  autoFocus
                  spellCheck={false}
                  autoComplete='off'
                  autoCorrect='off'
                  name='message'
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className='absolute right-0 top-4 sm:right-4'>
                  <div className='flex flex-row gap-2'>
                    {/* <Tooltip>
                    <TooltipTrigger asChild> */}
                    <VoiceButton setTranscript={setInputValue} />
                    {/* </TooltipTrigger>
                    <TooltipContent>Send voice</TooltipContent>
                  </Tooltip> */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type='submit'
                          size='icon'
                          disabled={inputValue === ''}
                          className='rounded-full'
                        >
                          <ArrowUpIcon className='' size={'18px'} />
                          <span className='sr-only'>Send message</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </form>
            <FooterText className='hidden sm:block' />
          </div>
        </div>
      </div>
    </div>
  );
}
