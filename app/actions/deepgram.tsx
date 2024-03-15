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
