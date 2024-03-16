'use client';

import { Button } from '@/components/ui/button';
import { lineaGoerli, thirdwebClient, tokenAddress } from '@/lib/utils/config';
import { useEffect, useState } from 'react';
import { prepareContractCall, toWei } from 'thirdweb';
import { getContract } from 'thirdweb/contract';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';
import { Input } from '../ui/input';

export function MintTokenComponent({ amount }: { amount: string }) {
  const activeAccount = useActiveAccount();
  const { mutate: sendTx, data: transactionHash } = useSendTransaction();
  const [currentAmount, setCurrentAmount] = useState(amount);

  const mintToken = async () => {
    const contract = getContract({
      client: thirdwebClient,
      address: tokenAddress,
      chain: lineaGoerli,
    });

    const tx = prepareContractCall({
      contract,
      // pass the method signature that you want to call
      method: 'function mintTo(address to, uint256 amount)',
      // and the params for that method
      // their types are automatically inferred based on the method signature
      params: [
        activeAccount ? activeAccount.address : '',
        toWei(currentAmount),
      ],
    });

    await sendTx(tx);
  };

  useEffect(() => {
    if (transactionHash) {
      const explorerLink = `https://explorer.goerli.linea.build/tx/${transactionHash}`;
    }
  }, [transactionHash]);

  return (
    <>
      <Input
        value={currentAmount}
        onChange={(e) => setCurrentAmount(e.target.value)}
      />
      <Button
        onClick={() => {
          mintToken();
        }}
      >
        Mint Token
      </Button>
      {transactionHash && (
        <div>{`https://explorer.goerli.linea.build/tx/${transactionHash.transactionHash}`}</div>
      )}
    </>
  );
}

export default MintTokenComponent;
