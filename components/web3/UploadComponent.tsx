'use client';

import { thirdwebClient } from '@/lib/utils/config';
import { use, useEffect, useState } from 'react';
import { MediaRenderer } from 'thirdweb/react';
import { upload } from 'thirdweb/storage';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ClipboardIcon } from 'lucide-react';
import { useLeaderboard } from '@/lib/hooks/add-score';
import { AI } from '@/app/actions/ai';
import { useUIState } from 'ai/rsc';
import { SystemMessage } from '../llm-stocks';

export function UploadComponent() {
  const [, setMessages] = useUIState<typeof AI>();

  const { isSuccess, callAddScore, data } = useLeaderboard();
  const [uploadedImageUri, setUploadedImageUri] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    } else {
      console.error('Please upload a valid image file (PNG)');
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      try {
        const uris = await upload({
          client: thirdwebClient, // Replace with your ThirdWeb client instance
          files: [selectedImage],
        });
        setUploadedImageUri(uris[0]);

        // add score
        await callAddScore();
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('No image selected');
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      const explorerLink = `https://goerli.lineascan.build/tx/${data?.transactionHash}`;

      setMessages((currentMessages: any) => [
        ...currentMessages,
        {
          id: Date.now(),
          display: (
            <SystemMessage>
              <a href={explorerLink} target='_blank' className='underline'>
                Open Explorer
              </a>
            </SystemMessage>
          ),
        },
      ]);
    }
  }, [isSuccess, data]);

  return (
    <>
      <div className='max-w-md mx-auto'>
        <h2 className='text-lg font-bold mb-4'>Upload Image</h2>
        <div className='flex items-center justify-center w-full'>
          <Input
            className='w-full'
            type='file'
            accept='image/png'
            onChange={handleImageChange}
          />
        </div>
        <div className='pt-4'>
          <Button onClick={handleUpload} disabled={selectedImage === undefined}>
            Upload
          </Button>
        </div>
        {uploadedImageUri && (
          <div className='flex flex-col mt-8 w-full gap-2'>
            <h3 className='text-lg font-bold mb-2'>Uploaded Image</h3>
            <div className='w-full max-w-sm'>
              <div className='flex w-full max-w-sm items-center space-x-2'>
                <Input readOnly value={uploadedImageUri} />
                <Button type='submit'>
                  <ClipboardIcon className='h-4 w-4' />
                  <span className='sr-only'>Copy</span>
                </Button>
              </div>
              <div>
                <div />
              </div>
            </div>
            <div className='flex w-full object-cover bg-clip-content'>
              <MediaRenderer
                className='w-full rounded-md object-cover'
                src={uploadedImageUri}
                alt='Uploaded PNG'
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UploadComponent;
