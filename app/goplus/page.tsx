'use client';

import { checkTokenSecurity } from '../actions/goplus';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div>
        <button
          onClick={async () => {
            const addressToCheck = 'Oxaa3c28B91f40A8ca2e8C8C4835C5Bd92c145e222';

            const data = await checkTokenSecurity(addressToCheck);
            console.log('data', data.status !== 0 ? 'It is safe!' : 'Not safe');
          }}
        >
          Check Token
        </button>
      </div>
    </div>
  );
}
