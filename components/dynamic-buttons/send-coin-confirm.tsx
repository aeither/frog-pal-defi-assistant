'use client';

import { AI } from '@/app/actions/ai';
import { useActions, useUIState } from 'ai/rsc';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';

export function SendCoinConfirm({
  amount,
  recipient,
}: {
  amount: number;
  recipient: string;
}) {
  const [innerUI, setInnerUI] = useState<null | React.ReactNode>(null);
  const [messages, setMessages] = useUIState<typeof AI>();

  // State variables for amount and recipient, initialized with the prop values
  const [currentAmount, setCurrentAmount] = useState<number>(amount);
  const [currentRecipient, setCurrentRecipient] = useState<string>(recipient);

  // Event handlers for input fields
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAmount(parseFloat(e.target.value));
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRecipient(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Confirm values:', currentAmount, currentRecipient);
    // Add your logic here to handle the confirmed values
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div>
          <CardHeader>
            <CardTitle className='text-2xl'>Send coin</CardTitle>
            <CardDescription>Confirm values</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='amount'>Amount</Label>
              <Input
                type='number'
                name='amount'
                id='amount'
                value={currentAmount}
                onChange={handleAmountChange}
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
              />{' '}
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
