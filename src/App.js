import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Base } from '@thirdweb-dev/chains';
import Reels from './components/Reels';

function App() {
  return (
    <ThirdwebProvider
      activeChain={Base}
      clientId="06bcfb42f1eeb14f3bdb12f16703ebb8"
    >
      <div className='App'>
        <Reels />
      </div>
    </ThirdwebProvider>
  );
}

export default App;