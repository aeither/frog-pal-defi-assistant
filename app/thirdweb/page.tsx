'use client';

import { Button } from '@/components/ui/button';
import {
  leaderboardAddress,
  thirdwebClient,
  tokenAddress,
} from '@/lib/utils/config';
import { useState } from 'react';
import { prepareContractCall, prepareTransaction, toWei } from 'thirdweb';
import { defineChain } from 'thirdweb/chains';
import { getContract } from 'thirdweb/contract';
import {
  MediaRenderer,
  useActiveAccount,
  useEstimateGas,
  useReadContract,
  useSendTransaction,
} from 'thirdweb/react';
import { upload } from 'thirdweb/storage';

const lineaChain = defineChain({
  id: 59144,
  rpc: 'https://linea.blockpi.network/v1/rpc/public',
});

const lineaGoerli = defineChain({
  id: 59140,
  rpc: 'https://rpc.goerli.linea.build',
});

export default function Home() {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [uploadedImageUri, setUploadedImageUri] = useState('');
  const activeAccount = useActiveAccount();
  const { mutate: sendTx, data: transactionHash } = useSendTransaction();
  const { mutate: estimateGas, data: gasEstimate } = useEstimateGas();

  const leaderboardContract = getContract({
    client: thirdwebClient,
    address: leaderboardAddress,
    chain: lineaGoerli,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      console.error('Please upload a valid image file (PNG)');
    }
  };

  const handleUpload = async () => {
    if (image) {
      try {
        const uris = await upload({
          client: thirdwebClient, // Replace with your ThirdWeb client instance
          files: [image],
        });
        setUploadedImageUri(uris[0]);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('No image selected');
    }
  };

  const callAddScore = async () => {
    const tx = prepareContractCall({
      contract: leaderboardContract,
      // pass the method signature that you want to call
      method: 'function addScore(address user, uint256 score)',
      // and the params for that method
      // their types are automatically inferred based on the method signature
      params: [activeAccount ? activeAccount.address : '', toWei('100')],
    });

    const transactionHash = await sendTx(tx);
  };

  const callEstimateGas = async () => {
    const tx = prepareTransaction({
      to: '0x000000000000000000000000000000000000dead',
      value: toWei('1'),
      gas: BigInt(160000),
      chain: lineaGoerli,
      client: thirdwebClient,
    });
    const estimatedGas = await estimateGas(tx);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div>
        <h2>Upload PNG Image</h2>
        <input type='file' accept='image/png' onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload</button>
        {uploadedImageUri && (
          <div>
            <h3>Uploaded Image URI:</h3>
            <p>{uploadedImageUri}</p>
            <MediaRenderer src={uploadedImageUri} alt='Uploaded PNG' />
          </div>
        )}
      </div>
      <MediaRenderer src='ipfs://QmV4HC9fNrPJQeYpbW55NLLuSBMyzE11zS1L4HmL6Lbk7X' />
      <MintTokenButton />
      <LeaderboardList />

      <Button
        onClick={async () => {
          await callAddScore();
        }}
      >
        Add Score
      </Button>

      <Button
        onClick={async () => {
          await callEstimateGas();
        }}
      >
        Estimate Gas
      </Button>
      {gasEstimate !== undefined && (
        <div>Gas: {BigInt(gasEstimate).toString()}</div>
      )}
    </div>
  );
}

// const deployToken = async () => {
//    const client = createThirdwebClient({
//   clientId: "<your_client_id>",
// });
//   const sdk = await ThirdwebSDK.fromWallet(wallet, 'sepolia');
//   const address = await sdk.deployer.('nft-collection', {
//     name: 'My NFT Contract',
//     primary_sale_recipient: '0x...',
//   });
//   console.log('Deployed at', address);
// };

function MintTokenButton() {
  const activeAccount = useActiveAccount();
  const { mutateAsync: sendTx, data: transactionHash } = useSendTransaction();

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
      params: [activeAccount ? activeAccount.address : '', toWei('100')],
    });

    const transactionHash = await sendTx(tx);
    console.log('🚀 ~ mintToken ~ transactionHash:', transactionHash);
  };

  return (
    <>
      <Button
        onClick={() => {
          mintToken();
        }}
      >
        Mint Token
      </Button>
    </>
  );
}

function LeaderboardList() {
  const contract = getContract({
    client: thirdwebClient,
    address: leaderboardAddress,
    chain: lineaGoerli,
  });
  const { data, isLoading } = useReadContract({
    contract: contract,
    method: 'getAll',
    params: [],
  });

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table-zebra table-compact table w-full'>
          <thead>
            <tr>
              <th className='text-start'>User</th>
              <th className='text-start'>Score</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              data &&
              data.map((item: any, index: number) => {
                return (
                  <tr key={index} className='hover'>
                    <td>{`${item.user.slice(0, 4)}...${item.user.slice(-4)}`}</td>
                    <td>{item.score.toString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
