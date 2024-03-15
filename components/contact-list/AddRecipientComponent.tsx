'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { addRecipient } from '@/app/actions/db';
import { useAccount } from 'wagmi';

export function AddRecipientComponent({
  name,
  recipient,
}: {
  name: string;
  recipient: string;
}) {
  // State variables for name and recipient, initialized with the prop values
  const [currentName, setCurrentName] = useState<string>(name);
  const [currentRecipient, setCurrentRecipient] = useState<string>(recipient);
  const { address } = useAccount();

  // Event handlers for input fields
  const handlenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.target.value);
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRecipient(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Confirm values:', currentName, currentRecipient);
    // Add your logic here to handle the confirmed values

    // call DB
    if (address) addRecipient(currentName, currentRecipient, address);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div>
          <CardHeader>
            <CardTitle className='text-2xl'>Add recipient</CardTitle>
            {/* <CardDescription>Confirm values</CardDescription> */}
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                value={currentName}
                onChange={handlenameChange}
              />{' '}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='recipient'>Recipient</Label>
              <Input
                type='text'
                name='recipient'
                id='recipient'
                value={currentRecipient}
                onChange={handleRecipientChange}
              />
            </div>
          </CardContent>

          <CardFooter>
            <Button type='submit'>Confirm</Button>
          </CardFooter>
        </div>
      </form>
    </Card>
  );
}
