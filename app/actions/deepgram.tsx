'use server';

import { env } from '@/env';
import { createClient } from '@deepgram/sdk';

export async function transcribeAudio(formData: FormData) {
  const audio = formData.get('audio');

  const deepgram = createClient(env.DEEPGRAM_API_KEY);

  const response = await deepgram.listen.prerecorded.transcribeFile(
    await (audio as any).arrayBuffer(),
    {
      model: 'nova',
    }
  );

  return {
    transcript: response.result?.results.channels[0].alternatives[0].transcript,
  };
}

interface SpeechRequest {
  text: string;
}

interface SpeechResponse {
  data: Blob;
}

const text = 'Hello, how can I help you today?';

export async function generateAudio(text: string) {
  const deepgram = createClient(env.DEEPGRAM_API_KEY);

  // STEP 2: Make a request and configure the request with options (such as model choice, audio configuration, etc.)
  const response = await deepgram.speak.request(
    { text },
    {
      model: 'aura-asteria-en',
      encoding: 'linear16',
      container: 'wav',
    }
  );

  // STEP 3: Get the audio stream and headers from the response
  const stream = await response.getStream();
  const headers = await response.getHeaders();

  if (stream) {
    // STEP 4: Convert the stream to an audio buffer
    const buffer = await getAudioBuffer(stream);
    const wavBased64 = buffer.toString('base64');
    return { data: wavBased64 };
  } else {
    throw new Error('Error generating audio');
  }
}

// helper function to convert stream to audio buffer
const getAudioBuffer = async (response: ReadableStream<Uint8Array>) => {
  const reader = response.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    chunks.push(value);
  }

  const dataArray = chunks.reduce(
    (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
    new Uint8Array(0)
  );

  return Buffer.from(dataArray.buffer);
};
