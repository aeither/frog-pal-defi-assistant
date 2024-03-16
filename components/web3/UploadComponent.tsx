'use client';

import { thirdwebClient } from '@/lib/utils/config';
import { useState } from 'react';
import { MediaRenderer } from 'thirdweb/react';
import { upload } from 'thirdweb/storage';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function UploadComponent() {
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
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('No image selected');
    }
  };

  return (
    <>
      <div className='max-w-md mx-auto mt-8'>
        <h2 className='text-2xl font-bold mb-4'>Upload PNG Image</h2>
        <div className='flex items-center justify-center w-full'>
          <Input type='file' accept='image/png' onChange={handleImageChange} />
        </div>
        <div className='p-4'>
          <Button onClick={handleUpload}>Upload</Button>
        </div>
        {uploadedImageUri && (
          <div className='mt-8 w-full'>
            <h3 className='text-lg font-bold mb-2'>Uploaded Image</h3>
            <p className='mb-4 truncate'>{uploadedImageUri}</p>
            <div className='flex rounded-md'>
              <MediaRenderer src={uploadedImageUri} alt='Uploaded PNG' />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UploadComponent;
