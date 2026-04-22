interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gray-50 pattern-dots">
      <div className="text-center max-w-sm">
        <h1 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">Bingo Mixer</h1>
        <p className="text-xl text-gray-600 mb-10 font-medium">Find your people!</p>
        
        <div className="bg-white rounded-lg p-8 border border-gray-300 mb-10 pattern-grid shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4 text-lg">How to play</h2>
          <ul className="text-left text-gray-600 text-sm space-y-3 leading-relaxed">
            <li>• Find people who match the questions</li>
            <li>• Tap a square when you find a match</li>
            <li>• Get 5 in a row to win!</li>
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
