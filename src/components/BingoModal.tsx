interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-xs w-full text-center shadow-lg animate-[bounce_0.5s_ease-out] pattern-grid">
        <div className="text-6xl mb-6">🏆</div>
        <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">BINGO!</h2>
        <p className="text-gray-600 mb-8 font-medium text-lg">You completed a line!</p>
        
        <button
          onClick={onDismiss}
          className="w-full bg-black text-white font-bold py-4 px-6 rounded-lg text-lg active:bg-gray-800 transition-all duration-150 hover:bg-gray-900 transform hover:scale-105 active:animate-tap"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
