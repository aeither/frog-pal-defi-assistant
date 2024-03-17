'use client';

import { ChatList } from '@/components/chat-list';
import { FooterText } from '@/components/footer';
// import LeaderboardList from '@/components/leaderboard/LeaderboardList';
// import { Purchase } from '@/components/llm-stocks';
import {
  BotCard,
  BotMessage,
  UserMessage,
} from '@/components/llm-stocks/message';
// import PortfolioComponent from '@/components/portfolio/PortfolioComponent';
// import { TransactionList } from '@/components/transactions/TransactionList';
import { Button } from '@/components/ui/button';
import { IconPlus } from '@/components/ui/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import VoiceButton from '@/components/voice/VoiceButton';
import MintTokenComponent from '@/components/web3/MintTokenComponent';
import UploadComponent from '@/components/web3/UploadComponent';
import { ChatScrollAnchor } from '@/lib/hooks/chat-scroll-anchor';
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit';
import { useActions, useUIState } from 'ai/rsc';
import { ArrowUpIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Textarea from 'react-textarea-autosize';
import { AI } from '../actions/ai';
// import {
//   PortfolioType,
//   TokenPosition,
//   getPortfolio,
//   getTokens,
// } from '../actions/zerion';
// import {
//   ZerionTransactionType,
//   getTransactions,
// } from '../actions/zerion/transactions';
// import TokenList from '@/components/tokens/TokenComponent';

// const userMessage = (
//   <UserMessage>
//     Minim deserunt incididunt commodo veniam. Cupidatat enim excepteur ut enim
//     velit esse veniam eiusmod officia amet. Veniam proident veniam tempor dolore
//     dolore dolor incididunt. Minim elit sit exercitation excepteur cupidatat
//     tempor magna qui elit anim. Cillum magna nulla commodo ad ut reprehenderit
//     excepteur amet commodo tempor consequat commodo tempor. Deserunt excepteur
//     id irure cillum labore veniam sint adipisicing. Culpa voluptate veniam anim
//     incididunt ad ex cillum id dolore veniam consequat amet elit dolore. In
//     consequat ullamco labore aliquip. Dolor aute exercitation aliqua incididunt
//     voluptate cupidatat reprehenderit. Velit mollit sit occaecat do duis eu
//     culpa proident. Ut tempor minim Lorem adipisicing et et voluptate eu elit
//     voluptate dolor incididunt magna. Consequat nisi sint elit est cillum.
//   </UserMessage>
// );

// const uploadComponent = (
//   <BotCard>
//     <UploadComponent />
//   </BotCard>
// );

// const mintTokenComponent = (
//   <BotCard>
//     <MintTokenComponent amount={'123'} />
//   </BotCard>
// );

// const purchaseComponent = (
//   <BotCard>
//     <Purchase defaultAmount={10} name={'symbol'} price={+123} />
//   </BotCard>
// );

// const leaderboardList = (
//   <BotCard>
//     <LeaderboardList />
//   </BotCard>
// );

// const PortfolioDisplayComponent = () => {
//   const [portfolioData, setPortfolioData] = useState<PortfolioType>();

//   const callGetPortfolio = async () => {
//     const data = await getPortfolio(
//       '0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A'
//     );
//     setPortfolioData(data.data);
//   };
//   useEffect(() => {
//     callGetPortfolio();
//   }, []);

//   return (
//     <BotCard>
//       {portfolioData && <PortfolioComponent portfolio={portfolioData} />}
//     </BotCard>
//   );
// };

// const TransactionDisplayComponent = () => {
//   const [transactions, setTransactions] = useState<ZerionTransactionType[]>();

//   const callGetTransactions = async () => {
//     const data = await getTransactions(
//       '0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A'
//     );

//     setTransactions(data.data);
//   };
//   useEffect(() => {
//     callGetTransactions();
//   }, []);

//   return (
//     <BotCard>
//       {transactions && <TransactionList transactions={transactions} />}
//     </BotCard>
//   );
// };

// const TokenDisplayComponent = () => {
//   const [addressTokens, setAddressTokens] = useState<TokenPosition[]>();

//   const callGetTransactions = async () => {
//     const data = await getTokens('0x88c6C46EBf353A52Bdbab708c23D0c81dAA8134A');

//     setAddressTokens(data.data);
//   };
//   useEffect(() => {
//     callGetTransactions();
//   }, []);

//   return (
//     <BotCard>
//       {addressTokens && <TokenList positions={addressTokens} />}
//     </BotCard>
//   );
// };

// const botMessage = <BotMessage>What is happening?</BotMessage>;

export default function Page() {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions();
  const [inputValue, setInputValue] = useState('');
  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages((currentMessages) => [
      ...currentMessages,
      // {
      //   id: Date.now(),
      //   display: userMessage,
      // },
      // {
      //   id: Date.now(),
      //   display: uploadComponent,
      // },
      // {
      //   id: Date.now(),
      //   display: botMessage,
      // },
      // {
      //   id: Date.now(),
      //   display: <TokenDisplayComponent />,
      // },
      // {
      //   id: Date.now(),
      //   display: <TransactionDisplayComponent />,
      // },
      // {
      //   id: Date.now(),
      //   display: <PortfolioDisplayComponent />,
      // },
      // {
      //   id: Date.now(),
      //   display: mintTokenComponent,
      // },
      // {
      //   id: Date.now(),
      //   display: purchaseComponent,
      // },
      // {
      //   id: Date.now(),
      //   display: leaderboardList,
      // },
    ]);
  }, []);

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

  return (
    <div>
      <div className='pb-[200px] pt-4 md:pt-10'>
        <>
          <ChatList messages={messages} />
        </>
        <ChatScrollAnchor trackVisibility={true} />
      </div>
      <div className='fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]'>
        <div className='mx-auto sm:max-w-2xl sm:px-4'>
          <div className='px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4'>
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
                  const responseMessage = await submitUserMessage(value);
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
              <div className='relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border sm:px-12'>
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
