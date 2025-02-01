import React, { useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Game } from './components/Game/Game';
import { IntroScreen } from './components/Intro/IntroScreen';
import { PlayerNumberInput } from './components/PlayerSetup/PlayerNumberInput';
import { initViewport } from './utils/rendering/viewport';
import { config } from './config/wagmi';

const queryClient = new QueryClient();

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showPlayerSetup, setShowPlayerSetup] = useState(false);
  const [playerName, setPlayerName] = useState('');

  useEffect(() => {
    return initViewport();
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowPlayerSetup(true);
  };

  const handlePlayerSetup = (name: string) => {
    setPlayerName(name);
    setShowPlayerSetup(false);
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-black">
          {showIntro ? (
            <IntroScreen onComplete={handleIntroComplete} />
          ) : showPlayerSetup ? (
            <PlayerNumberInput onSubmit={handlePlayerSetup} />
          ) : (
            <Game initialPlayerName={playerName} />
          )}
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;