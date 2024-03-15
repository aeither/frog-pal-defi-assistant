'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ZerionChain,
  getChains,
  getPortfolio,
  PortfolioType,
} from '../actions/zerion';
import { getTransactions } from '../actions/zerion/transactions';
import PortfolioComponent from '@/components/portfolio/PortfolioComponent';
import { ZerionTransactionType } from '../actions/zerion/transactions';
import Transaction from '@/components/transactions/Transaction';
import { TokenPosition, getTokens } from '../actions/zerion/tokens';
import TokenList from '@/components/tokens/TokenComponent';
import { MediaRenderer } from 'thirdweb/react';
import { upload } from 'thirdweb/storage';
import { thirdwebClient } from '@/lib/utils/config';

export default function Home() {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [uploadedImageUri, setUploadedImageUri] = useState('');

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
            <img src={uploadedImageUri} alt='Uploaded PNG' />
          </div>
        )}
      </div>

      <MediaRenderer src='ipfs://QmV4HC9fNrPJQeYpbW55NLLuSBMyzE11zS1L4HmL6Lbk7X' />
    </div>
  );
}
