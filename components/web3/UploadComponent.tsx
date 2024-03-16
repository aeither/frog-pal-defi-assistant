'use client';

import { thirdwebClient } from '@/lib/utils/config';
import { useState } from 'react';
import { MediaRenderer } from 'thirdweb/react';
import { upload } from 'thirdweb/storage';

export function UploadComponent() {
  const [uploadedImageUri, setUploadedImageUri] = useState('');
  const [image, setImage] = useState<File | undefined>(undefined);

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
    <>
      <div>
        <h2>Upload PNG Image</h2>
        <input type='file' accept='image/png' onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload</button>
        {uploadedImageUri && (
          <div>
            <h3>Uploaded Image</h3>
            <p>{uploadedImageUri}</p>
            <MediaRenderer src={uploadedImageUri} alt='Uploaded PNG' />
          </div>
        )}
      </div>
    </>
  );
}

export default UploadComponent;
