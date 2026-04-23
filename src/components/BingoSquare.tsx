import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-3 text-center border border-gray-300 rounded transition-all duration-200 select-none min-h-[120px] text-xs leading-tight transform active:scale-95 hover:scale-105';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-gray-300 border-gray-500 text-gray-900 glow-winning'
      : 'bg-gray-200 border-gray-400 text-gray-800'
    : 'bg-white text-gray-700 active:bg-gray-200 hover:bg-gray-100';

  const freeSpaceClasses = square.isFreeSpace ? 'font-black text-sm' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-1 right-1 text-gray-600 text-sm font-bold">✓</span>
      )}
    </button>
  );
}
