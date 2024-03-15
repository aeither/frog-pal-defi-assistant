'use client';

import dynamic from 'next/dynamic';

const ConfettiButton = dynamic(
  () => import('./confetti-button').then((mod) => mod.ConfettiButton),
  {
    ssr: false,
    loading: () => <div>loading...</div>,
  }
);

export { ConfettiButton };
