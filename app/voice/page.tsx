'use client';

import { useState } from 'react';
import { transcribeAudio } from '../actions/deepgram';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
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

          const users = await transcribeAudio(formData);
          console.log('🚀 ~ mediaRecorder.addEventListener ~ users:', users);
          // const response = await transcribeAudio(audioBlob);
          // setTranscript(response.transcript);
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
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <button
        className={`px-4 py-2 rounded ${
          isRecording ? 'bg-red-500' : 'bg-green-500'
        } text-white`}
        onClick={startRecording}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      <button
        className={`px-4 py-2 rounded ${
          isRecording ? 'bg-red-500' : 'bg-green-500'
        } text-white`}
        onClick={stopRecording}
      >
        STOP
      </button>

      {transcript && (
        <div className='mt-8'>
          <h2 className='text-xl font-bold mb-4'>Transcript:</h2>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
}
