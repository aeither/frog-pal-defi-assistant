import 'server-only';

import { createAI } from 'ai/rsc';
import { confirmPurchase } from './ai-actions/confirmPurchase';
import { showForm } from './ai-actions/showForm';
import { submitUserMessage } from './ai-actions/submitUserMessage';

const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitUserMessage,
    confirmPurchase,
    showForm,
  },
  initialUIState,
  initialAIState,
});
