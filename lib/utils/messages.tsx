const exampleMessages = [
  {
    heading: 'Show me my portfolio',
    message: 'Show me my portfolio',
  },
  {
    heading: 'I want to upload an Image',
    message: 'I want to upload an Image',
  },
  {
    heading: 'Open the leaderboard',
    message: 'Open the leaderboard',
  },
  {
    heading: 'What is in my favourite list',
    message: 'What is in my favourite list',
  },
  {
    heading: 'Mint me 130 tokens, please',
    message: 'Mint me 130 tokens, please',
  },
];

export type Shortcut = {
  heading: string;
  message: string;
};

export const getShortcutsFromLocalStorage = () => {
  const shortcuts = localStorage.getItem('ai-home-shortcuts');
  return shortcuts ? JSON.parse(shortcuts) : exampleMessages;
};

export const saveShortcutsToLocalStorage = (shortcuts: Shortcut[]) => {
  localStorage.setItem('ai-home-shortcuts', JSON.stringify(shortcuts));
};
