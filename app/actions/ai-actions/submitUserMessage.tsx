import 'server-only';

import { Confetti } from '@/components/confetti';
import { AddRecipientComponent } from '@/components/contact-list/AddRecipientComponent';
import { ConfettiButton } from '@/components/dynamic-buttons/confetti-button';
import { SendCoinConfirm } from '@/components/dynamic-buttons/send-coin-confirm';
import {
  BotCard,
  BotMessage,
  Events,
  Purchase,
  Stock,
  Stocks,
  spinner,
} from '@/components/llm-stocks';
import { EventsSkeleton } from '@/components/llm-stocks/events-skeleton';
import { StockSkeleton } from '@/components/llm-stocks/stock-skeleton';
import { StocksSkeleton } from '@/components/llm-stocks/stocks-skeleton';
import { env } from '@/env';
import { runOpenAICompletion, sleep } from '@/lib/utils';
import { createStreamableUI, getMutableAIState } from 'ai/rsc';
import OpenAI from 'openai';
import { z } from 'zod';
import { AI } from '../ai';
import { getPortfolio, getTokens, getTransactions } from '../zerion';
import PortfolioComponent from '@/components/portfolio/PortfolioComponent';
import { TransactionList } from '@/components/transactions/TransactionList';
import TokenList from '@/components/tokens/TokenComponent';
import { getAllRecipientsByAddress } from '../db';
import { ViewRecipentsComponent } from '@/components/contact-list/ViewRecipentsComponent';
import MintTokenComponent from '@/components/web3/MintTokenComponent';
import UploadComponent from '@/components/web3/UploadComponent';
import { checkTokenSecurity } from '../goplus';
import LeaderboardList from '@/components/leaderboard/LeaderboardList';

interface CoinGeckoResponse {
  [key: string]: {
    usd: number;
  };
}

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function submitUserMessage(content: string) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content,
    },
  ]);

  const reply = createStreamableUI(
    <BotMessage className='items-center'>{spinner}</BotMessage>
  );

  const completion = runOpenAICompletion(openai, {
    model: 'gpt-4-turbo-preview',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `\
You are Frog, Defi Companion who is going to help the user navigate defi and interact with protocols.
You can let the user throw confetti, as many times as they want, to celebrate.

Messages inside [] means that it's a UI element or a user event. For example:
- "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
- "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.

If the user requests gamified leaderboard list, call \`leaderboard_list\`.
If the user requests smart contract token security check, call \`security_check\`.
If the user requests upload image, call \`upload_ipfs\`.
If the user requests mint tokens and provides the amount, call \`mint_token\`.
If the user requests view tokens or coins by providing an EVM address, call \`check_tokens_by_address\`.
If the user requests view historical transactions or txs by providing an EVM address, call \`check_transactions_by_address\`.
If the user requests portfolio balance by providing an EVM address, call \`check_portfolio_by_address\`.
If the user ask for his own portfolio balance call \`check_portfolio_by_address\` with the EVM address. EVM address starts with 0x...
If the user requests add recipient, call \`add_recipient\`. Include callers EVM address
If the user requests see/watch/view list/contacts or favourites call \`view_address_list\`. Include callers EVM address
If the user requests send coin to someone, call \`send_coin\`.
If the user requests confetti button, call \`confetti_button\` to show button confetti.
If the user requests throwing confetti, call \`throw_confetti\` to throw confetti.

Remember you are a conversational bot. Your answers are concise and straight to the point.
Besides that, you can also chat with users and do some calculations if needed.`,
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],

    functions: [
      {
        name: 'leaderboard_list',
        description:
          'show leaderboard list to see points by address classification',
        parameters: z.object({}),
      },
      {
        name: 'security_check',
        description: 'check with go plus if token smart contract is secure',
        parameters: z.object({
          address: z.string(),
        }),
      },
      {
        name: 'upload_ipfs',
        description: 'Show form for the user to upload image to IPFS',
        parameters: z.object({}),
      },
      {
        name: 'mint_token',
        description: 'Mint an amount of tokens defined by the user',
        parameters: z.object({
          amount: z.string(),
        }),
      },
      {
        name: 'check_tokens_by_address',
        description:
          'Check the tokens or coins from provided address or use the asker address if wants to check own',
        parameters: z.object({
          address: z.string(),
        }),
      },
      {
        name: 'check_transactions_by_address',
        description:
          'Check the transactions txs from provided address or use the asker address if wants to check own',
        parameters: z.object({
          address: z.string(),
        }),
      },
      {
        name: 'check_portfolio_by_address',
        description:
          'Check the portfolio balance from provided address or the asker if wants to own',
        parameters: z.object({
          address: z.string(),
        }),
      },
      {
        name: 'add_recipient',
        description:
          'Show form for user to add name with evm recipient address',
        parameters: z.object({
          name: z.string(),
          recipient: z.string(),
          address: z.string(),
        }),
      },
      {
        name: 'view_address_list',
        description:
          'Show form for user to add name with evm recipient address',
        parameters: z.object({
          address: z.string(),
        }),
      },
      {
        name: 'send_coin',
        parameters: z
          .object({
            amount: z.number(),
            recipient: z.string(),
          })
          .required(),
      },
      {
        name: 'flip_coin',
        parameters: z.object({
          times: z.string(),
          results: z.string(),
        }),
      },
      {
        name: 'confetti_button',
        description:
          'Show a button to the user for the user to tap on it to create confetti',
        parameters: z.object({}),
      },
      {
        name: 'throw_confetti',
        description: 'Throw confetti to the user. Use this to celebrate.',
        parameters: z.object({}),
      },
      {
        name: 'show_stock_price',
        description:
          'Get the current stock price of a given stock or currency. Use this to show the price to the user.',
        parameters: z.object({
          symbol: z
            .string()
            .describe(
              'The name of the crypto currency. e.g. bitcoin/ethereum...'
            ),
          // price: z.number().describe('The price of the stock.'),
          // delta: z.number().describe('The change in price of the stock'),
        }),
      },
      {
        name: 'show_stock_purchase_ui',
        description:
          'Show price and the UI to purchase a stock or currency. Use this if the user wants to purchase a stock or currency.',
        parameters: z.object({
          symbol: z
            .string()
            .describe(
              'The name or symbol of the stock or currency. e.g. DOGE/AAPL/USD.'
            ),
          price: z.number().describe('The price of the stock.'),
          numberOfShares: z
            .number()
            .describe(
              'The **number of shares** for a stock or currency to purchase. Can be optional if the user did not specify it.'
            ),
        }),
      },
      {
        name: 'list_stocks',
        description: 'List three imaginary stocks that are trending.',
        parameters: z.object({
          stocks: z.array(
            z.object({
              symbol: z.string().describe('The symbol of the stock'),
              price: z.number().describe('The price of the stock'),
              delta: z.number().describe('The change in price of the stock'),
            })
          ),
        }),
      },
      {
        name: 'get_events',
        description:
          'List funny imaginary events between user highlighted dates that describe stock activity.',
        parameters: z.object({
          events: z.array(
            z.object({
              date: z
                .string()
                .describe('The date of the event, in ISO-8601 format'),
              headline: z.string().describe('The headline of the event'),
              description: z.string().describe('The description of the event'),
            })
          ),
        }),
      },
    ],
    temperature: 0,
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessage>{content}</BotMessage>);
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: 'assistant', content }]);
    }
  });

  completion.onFunctionCall('leaderboard_list', async () => {
    reply.done(
      <BotMessage>
        <LeaderboardList />
      </BotMessage>
    );
  });

  completion.onFunctionCall(
    'security_check',
    async ({ address }: { address: string }) => {
      const data = await checkTokenSecurity(address);
      const status = data.status !== 0 ? 'It is safe!' : 'Not safe!';
      reply.done(<BotMessage>{status}</BotMessage>);
    }
  );

  completion.onFunctionCall('upload_ipfs', () => {
    reply.done(
      <BotCard>
        <UploadComponent />
      </BotCard>
    );
  });

  completion.onFunctionCall('mint_token', ({ amount }: { amount: string }) => {
    reply.done(
      <BotCard>
        <MintTokenComponent amount={amount} />
      </BotCard>
    );
  });

  completion.onFunctionCall(
    'add_recipient',
    ({ name, recipient }: { name: string; recipient: string }) => {
      reply.done(
        <BotCard>
          <AddRecipientComponent name={name} recipient={recipient} />
        </BotCard>
      );
    }
  );

  completion.onFunctionCall(
    'view_address_list',
    async ({ address }: { address: string }) => {
      const allRecipients = await getAllRecipientsByAddress(address);
      reply.done(
        <BotCard>
          <ViewRecipentsComponent recipients={allRecipients} />
        </BotCard>
      );
    }
  );

  completion.onFunctionCall(
    'check_tokens_by_address',
    async ({ address }: { address: string }) => {
      const data = await getTokens(address);
      reply.done(
        <BotCard>
          <TokenList positions={data.data} />
        </BotCard>
      );
    }
  );

  completion.onFunctionCall(
    'check_transactions_by_address',
    async ({ address }: { address: string }) => {
      const data = await getTransactions(address);
      reply.done(
        <BotCard>
          <TransactionList transactions={data.data} />
        </BotCard>
      );
    }
  );

  completion.onFunctionCall(
    'check_portfolio_by_address',
    async ({ address }: { address: string }) => {
      const data = await getPortfolio(address);
      reply.done(
        <BotCard>
          <PortfolioComponent portfolio={data.data} />
        </BotCard>
      );
    }
  );

  completion.onFunctionCall(
    'send_coin',
    ({ amount, recipient }: { amount: number; recipient: string }) => {
      reply.done(
        <BotMessage>
          <SendCoinConfirm amount={amount} recipient={recipient} />
        </BotMessage>
      );
    }
  );

  completion.onFunctionCall(
    'flip_coin',
    ({ times, results }: { times: string; results: string }) => {
      reply.done(
        <BotMessage>
          <div>{times}</div>
          <div>{results}</div>
        </BotMessage>
      );
    }
  );

  completion.onFunctionCall('confetti_button', () => {
    reply.done(
      <BotMessage>
        <ConfettiButton />
      </BotMessage>
    );
    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'confetti_button',
        content: `[User has requested to show confetti button]`,
      },
    ]);
  });

  completion.onFunctionCall('throw_confetti', () => {
    reply.done(
      <BotMessage>
        <Confetti />
      </BotMessage>
    );
    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'throw_confetti',
        content: `[User has requested to throw confetti]`,
      },
    ]);
  });

  completion.onFunctionCall('list_stocks', async ({ stocks }) => {
    reply.update(
      <BotCard>
        <StocksSkeleton />
      </BotCard>
    );

    await sleep(1000);

    reply.done(
      <BotCard>
        <Stocks stocks={stocks} />
      </BotCard>
    );

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'list_stocks',
        content: JSON.stringify(stocks),
      },
    ]);
  });

  completion.onFunctionCall('get_events', async ({ events }) => {
    reply.update(
      <BotCard>
        <EventsSkeleton />
      </BotCard>
    );

    await sleep(1000);

    reply.done(
      <BotCard>
        <Events events={events} />
      </BotCard>
    );

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'list_stocks',
        content: JSON.stringify(events),
      },
    ]);
  });

  completion.onFunctionCall(
    'show_stock_price',
    async ({
      symbol,
      // price,
      // delta,
    }: {
      symbol: string;
      // price: number;
      // delta: number;
    }) => {
      reply.update(
        <BotCard>
          <StockSkeleton />
        </BotCard>
      );

      console.log('symbol', symbol);

      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
      );

      const data: CoinGeckoResponse = await response.json();
      const coinName = Object.keys(data)[0];
      const price = data[coinName].usd;

      // await sleep(1000);

      reply.done(
        <BotCard>
          <Stock name={symbol} price={price} />
        </BotCard>
      );

      // aiState.done([
      //   ...aiState.get(),
      //   {
      //     role: 'function',
      //     name: 'show_stock_price',
      //     content: `[Price of ${symbol} = ${price}]`,
      //   },
      // ]);
    }
  );

  completion.onFunctionCall(
    'show_stock_purchase_ui',
    ({
      symbol,
      price,
      numberOfShares = 100,
    }: {
      symbol: string;
      price: number;
      numberOfShares?: number;
    }) => {
      if (numberOfShares <= 0 || numberOfShares > 1000) {
        reply.done(<BotMessage>Invalid amount</BotMessage>);
        aiState.done([
          ...aiState.get(),
          {
            role: 'function',
            name: 'show_stock_purchase_ui',
            content: `[Invalid amount]`,
          },
        ]);
        return;
      }

      reply.done(
        <>
          <BotMessage>
            Sure!{' '}
            {typeof numberOfShares === 'number'
              ? `Click the button below to purchase ${numberOfShares} shares of $${symbol}:`
              : `How many $${symbol} would you like to purchase?`}
          </BotMessage>
          <BotCard showAvatar={false}>
            <Purchase
              defaultAmount={numberOfShares}
              name={symbol}
              price={+price}
            />
          </BotCard>
        </>
      );
      aiState.done([
        ...aiState.get(),
        {
          role: 'function',
          name: 'show_stock_purchase_ui',
          content: `[UI for purchasing ${numberOfShares} shares of ${symbol}. Current price = ${price}, total cost = ${
            numberOfShares * price
          }]`,
        },
      ]);
    }
  );

  return {
    id: Date.now(),
    display: reply.value,
  };
}
