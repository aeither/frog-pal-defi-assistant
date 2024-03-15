"use server";

import { createClient } from "@deepgram/sdk";

export async function transcribeAudio(formData: FormData) {
  const audio = formData.get("audio");

  const deepgram = createClient(process.env.DEEPGRAM_API_KEY as string);

  const response = await deepgram.listen.prerecorded.transcribeFile(
    await (audio as any).arrayBuffer(),
    {
      model: "nova",
    }
  );

  return {
    transcript: response.result?.results.channels[0].alternatives[0].transcript,
  };
}
