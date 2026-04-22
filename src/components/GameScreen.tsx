import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-gray-50 pattern-dots">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 pattern-grid">
        <button
          onClick={onReset}
          className="text-gray-600 text-sm px-4 py-2 rounded active:bg-gray-200 transition-all duration-150 hover:bg-gray-100 transform hover:scale-105 active:animate-tap font-medium"
        >
          ← Back
        </button>
        <h1 className="font-black text-gray-900 text-xl tracking-tight">Bingo Mixer</h1>
        <div className="w-20"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-gray-600 text-sm py-3 px-4 font-medium">
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="bg-gray-200 text-gray-800 text-center py-3 font-bold text-sm pulse-mono border-y border-gray-300">
          🎉 BINGO! You got a line!
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-4">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
