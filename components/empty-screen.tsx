import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Shortcut,
  getShortcutsFromLocalStorage,
  saveShortcutsToLocalStorage,
} from '@/lib/utils/messages';
import { Label } from '@radix-ui/react-label';
import { Edit, XIcon } from 'lucide-react';
import { Suspense, useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function EmptyScreen({
  submitMessage,
}: {
  submitMessage: (message: string) => void;
}) {
  const [shortcuts, setShortcuts] = useState(getShortcutsFromLocalStorage());
  const [editMode, setEditMode] = useState(false);

  const handleAddShortcut = (newShortcut: Shortcut) => {
    const updatedShortcuts = [...shortcuts, newShortcut];
    setShortcuts(updatedShortcuts);
    saveShortcutsToLocalStorage(updatedShortcuts);
  };

  const handleRemoveShortcut = (index: number) => {
    const updatedShortcuts = [...shortcuts];
    updatedShortcuts.splice(index, 1);
    setShortcuts(updatedShortcuts);
    saveShortcutsToLocalStorage(updatedShortcuts);
  };
  return (
    <>
      <div className=' mx-auto max-w-2xl px-4 py-6'>
        <div className='flex shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary overflow-hidden'>
          <img
            src='/frog_pal_square.jpg'
            alt=''
            className='object-cover w-full h-full'
          />
        </div>
        <h2 className='flex text-center'>
          Hey there buddy, it's your old pal Frog! What's shakin'? Need a hand
          with anything?
        </h2>
      </div>
      <div className='mx-auto max-w-2xl px-4'>
        <div className='rounded-lg border bg-background p-8 mb-4'>
          <div className='flex w-full justify-between items-center mb-4'>
            <h1 className='text-lg font-semibold'>Shortcuts</h1>
            <div className='flex gap-2'>
              <Button
                onClick={() => setEditMode(!editMode)}
                variant={'outline'}
              >
                <Edit size={'18px'} />
              </Button>
              <DialogAddButton addShortcut={handleAddShortcut} />
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {shortcuts.map((message: Shortcut, index: number) => (
              <ShortcutCard
                key={index}
                index={index}
                message={message}
                submitMessage={submitMessage}
                editMode={editMode}
                onRemove={handleRemoveShortcut}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function ShortcutCard({
  submitMessage,
  message,
  index,
  editMode,
  onRemove,
}: {
  submitMessage: any;
  message: any;
  index: any;
  editMode: boolean;
  onRemove: any;
}) {
  return (
    <>
      <Card
        key={index}
        onClick={async () => {
          submitMessage(message.message);
        }}
        className='cursor-pointer relative group p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-300 h-20'
      >
        <CardContent className='h-full'>
          <div className='h-full w-full flex flex-col justify-between items-start'>
            {editMode ? (
              <button
                className='absolute top-2 right-2 opacity-70 group-hover:opacity-100 duration-300 bg-red-500 rounded-full p-1'
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event bubbling

                  onRemove(index);
                }}
              >
                <XIcon className='text-white h-5 w-5' />
              </button>
            ) : null}
            <p className='text-white text-left w-full'>{message.heading}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function DialogAddButton({
  addShortcut,
}: {
  addShortcut: (newShortcut: Shortcut) => void;
}) {
  const [newHeading, setNewHeading] = useState('');
  const [newMessage, setNewMessage] = useState('');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>Add</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Add shortcut</DialogTitle>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='heading' className='sr-only'>
              Heading
            </Label>
            <Input
              id='heading'
              onChange={(e) => setNewHeading(e.target.value)}
              placeholder='Today trending topics'
            />
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <div className='grid flex-1 gap-2'>
            <Label htmlFor='message' className='sr-only'>
              Message
            </Label>
            <Textarea
              id='message'
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder='Search for today hottest trends'
            />
          </div>
        </div>
        <DialogFooter className='sm:justify-end gap-2'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                addShortcut({
                  heading: newHeading,
                  message: newMessage,
                });
              }}
              disabled={newHeading == '' || newMessage == ''}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
