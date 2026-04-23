import type { CardData } from '../types';

interface CardDeckScreenProps {
  cardDeck: CardData[];
  currentCard: CardData | null;
  onDrawCard: () => void;
  onReset: () => void;
}

export function CardDeckScreen({
  cardDeck,
  currentCard,
  onDrawCard,
  onReset,
}: CardDeckScreenProps) {
  const remainingCards = cardDeck.filter(card => !card.isDrawn).length;
  const totalCards = cardDeck.length;

  return (
    <div className="flex flex-col min-h-full bg-gray-50 pattern-dots">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 pattern-grid">
        <button
          onClick={onReset}
          className="text-gray-600 text-sm px-4 py-2 rounded active:bg-gray-200 transition-all duration-150 hover:bg-gray-100 transform hover:scale-105 active:animate-tap font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
          aria-label="Return to mode selection"
        >
          ← Back
        </button>
        <h1 className="font-black text-gray-900 text-xl tracking-tight">Card Deck Shuffle</h1>
        <div className="w-20"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-gray-600 text-sm py-3 px-4 font-medium">
        Tap Draw Card to reveal a random question
      </p>

      {/* Card Counter */}
      <div className="text-center text-gray-500 text-sm py-2">
        {remainingCards} of {totalCards} cards remaining
      </div>

      {/* Card Display */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          {currentCard ? (
            <div className="bg-white rounded-xl p-8 border border-gray-300 shadow-lg pattern-grid mb-8 animate-in fade-in duration-300">
              <div className="text-6xl mb-4">🎴</div>
              <p className="text-lg text-gray-800 font-medium leading-relaxed">
                {currentCard.text}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 border border-gray-300 shadow-lg pattern-grid mb-8 opacity-50">
              <div className="text-6xl mb-4">🎴</div>
              <p className="text-lg text-gray-500 font-medium">
                No card drawn yet
              </p>
            </div>
          )}

          {/* Draw Button */}
          <button
            onClick={onDrawCard}
            disabled={remainingCards === 0}
            className={`w-full py-6 px-8 rounded-xl text-xl font-bold transition-all duration-150 transform ${
              remainingCards === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-900 active:bg-gray-800 hover:scale-105 active:animate-tap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400'
            }`}
            aria-label={remainingCards === 0 ? 'Deck is empty' : 'Draw random question card'}
          >
            {remainingCards === 0 ? 'Deck Empty' : 'Draw Card'}
          </button>

          {remainingCards === 0 && (
            <p className="text-gray-500 text-sm mt-4">
              All cards have been drawn! Start a new game to shuffle again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}