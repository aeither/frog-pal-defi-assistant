const exampleMessages = [
  {
    heading: 'Show confetti button',
    message: 'Show confetti button',
  },
  {
    heading: 'Throw confetti',
    message: 'Throw confetti',
  },
  {
    heading: 'What are the trending stocks?',
    message: 'What are the trending stocks?',
  },
  {
    heading: "What's the stock price of AAPL?",
    message: "What's the stock price of AAPL?",
  },
  {
    heading: "I'd like to buy 10 shares of MSFT",
    message: "I'd like to buy 10 shares of MSFT",
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
