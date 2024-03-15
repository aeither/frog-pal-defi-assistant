'use client';

import { useState } from 'react';
import { generateAudio } from '../actions/deepgram';

export default function Home() {
  const [text, setText] = useState('Hello, how can I help you today?');
  //   const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const [base64Audio, setBase64Audio] = useState<string | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleGenerateAudio = async () => {
    try {
      const audioBuffer = await generateAudio(text);
      console.log('🚀 ~ handleGenerateAudio ~ audioBuffer:', audioBuffer);
      setBase64Audio(audioBuffer.data);
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Text-to-Speech</h1>
      <textarea
        className='border border-gray-300 rounded-md p-2 mb-4'
        value={text}
        onChange={handleTextChange}
        rows={4}
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleGenerateAudio}
      >
        Generate Audio
      </button>
      {/* {audioData && (
        <audio controls>
          <source
            src={URL.createObjectURL(new Blob([audioData]))}
            type='audio/wav'
          />
        </audio>
      )} */}
      {base64Audio && (
        <audio controls>
          <source
            src={`data:audio/wav;base64,${base64Audio}`}
            type='audio/wav'
          />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
