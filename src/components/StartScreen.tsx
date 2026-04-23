import type { GameMode } from '../types';

interface StartScreenProps {
  onStart: () => void;
  gameMode: GameMode;
  onSetGameMode: (mode: GameMode) => void;
}

export function StartScreen({ onStart, gameMode, onSetGameMode }: StartScreenProps) {
  const instructions = gameMode === 'bingo' 
    ? [
        "Find people who match the questions",
        "Tap a square when you find a match",
        "Get 5 in a row to win!"
      ]
    : [
        "Tap to draw a random question card",
        "Find someone who matches the question",
        "Keep drawing cards to meet more people!"
      ];

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gray-50 pattern-dots">
      <div className="text-center max-w-sm">
        <h1 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">Bingo Mixer</h1>
        <p className="text-xl text-gray-600 mb-10 font-medium">Find your people!</p>
        
        {/* Mode Selection */}
        <div className="bg-white rounded-lg p-6 border border-gray-300 mb-6 pattern-grid shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">Choose Game Mode</h2>
          <div className="space-y-3">
            <button
              onClick={() => onSetGameMode('bingo')}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-150 ${
                gameMode === 'bingo'
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400`}
              aria-pressed={gameMode === 'bingo'}
            >
              <div className="font-bold text-lg">Bingo Board</div>
              <div className="text-sm opacity-80 mt-1">Classic 5x5 bingo with questions</div>
            </button>
            <button
              onClick={() => onSetGameMode('card-deck')}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-150 ${
                gameMode === 'card-deck'
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400`}
              aria-pressed={gameMode === 'card-deck'}
            >
              <div className="font-bold text-lg">Card Deck Shuffle</div>
              <div className="text-sm opacity-80 mt-1">Draw random question cards</div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-300 mb-10 pattern-grid shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">How to play</h2>
          <ul className="text-left text-gray-600 text-sm space-y-3 leading-relaxed">
            {instructions.map((instruction, index) => (
              <li key={index}>• {instruction}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-black text-white font-bold py-5 px-8 rounded-lg text-xl active:bg-gray-800 transition-all duration-150 hover:bg-gray-900 transform hover:scale-105 active:animate-tap"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
