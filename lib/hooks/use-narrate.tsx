import { generateAudio } from '@/app/actions/deepgram';
import { useCallback } from 'react';

export const useNarrate = () => {
  const handleGenerateAudio = useCallback(async (text: string) => {
    try {
      const audioBuffer = await generateAudio(text);

      var audioInstance = new Audio(
        'data:audio/wav;base64,' + audioBuffer.data
      );
      audioInstance.play();
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  }, []);

  return {
    handleGenerateAudio,
  };
};
