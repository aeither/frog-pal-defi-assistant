'use client';

import { transcribeAudio } from '@/app/actions/deepgram';
import { MicIcon, MicOffIcon } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';

export function VoiceButton({
  setTranscript,
}: {
  setTranscript: Dispatch<SetStateAction<string>>;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

        setAudioChunks([]);

        try {
          console.log('hello');

          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.wav');

          const data = await transcribeAudio(formData);
          console.log(
            '🚀 ~ mediaRecorder.addEventListener ~ users:',
            data.transcript
          );
          // const response = await transcribeAudio(audioBlob);
          setTranscript(data.transcript as string);
        } catch (error) {
          console.error('Error transcribing audio:', error);
        }
      });

      mediaRecorder.start();
      setMediaRecorder(mediaRecorder);
      setIsRecording(true);
    });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <>
      {isRecording ? (
        <Button
          type='button'
          size='icon'
          variant={'destructive'}
          className='rounded-full p-2'
          onClick={stopRecording}
        >
          <MicOffIcon />
          <span className='sr-only'>Send voice</span>
        </Button>
      ) : (
        <Button
          type='button'
          size='icon'
          variant={'outline'}
          className='rounded-full p-2'
          onClick={startRecording}
        >
          <MicIcon />
          <span className='sr-only'>Send voice</span>
        </Button>
      )}

      {/* {transcript && (
        <div className='mt-8'>
          <h2 className='text-xl font-bold mb-4'>Transcript:</h2>
          <p>{transcript}</p>
        </div>
      )} */}
    </>
  );
}

export default VoiceButton;
