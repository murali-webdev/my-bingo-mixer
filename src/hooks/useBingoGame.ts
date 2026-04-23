import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BingoSquareData, BingoLine, GameState, GameMode, CardData } from '../types';
import {
  generateBoard,
  toggleSquare,
  checkBingo,
  getWinningSquareIds,
  generateCardDeck,
  drawNextCard,
  getCurrentCard,
} from '../utils/bingoLogic';

export interface BingoGameState {
  gameMode: GameMode;
  gameState: GameState;
  board: BingoSquareData[];
  cardDeck: CardData[];
  currentCard: CardData | null;
  winningLine: BingoLine | null;
  winningSquareIds: Set<number>;
  showBingoModal: boolean;
}

export interface BingoGameActions {
  setGameMode: (mode: GameMode) => void;
  startGame: () => void;
  handleSquareClick: (squareId: number) => void;
  drawCard: () => void;
  resetGame: () => void;
  dismissModal: () => void;
}

const STORAGE_KEY = 'bingo-game-state';
const STORAGE_VERSION = 2;

interface StoredGameData {
  version: number;
  gameMode: GameMode;
  gameState: GameState;
  board: BingoSquareData[];
  cardDeck: CardData[];
  winningLine: BingoLine | null;
}

function validateStoredData(data: unknown): data is StoredGameData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const obj = data as Record<string, unknown>;

  if (obj.version !== STORAGE_VERSION) {
    return false;
  }

  if (typeof obj.gameMode !== 'string' || !['bingo', 'card-deck'].includes(obj.gameMode)) {
    return false;
  }

  if (typeof obj.gameState !== 'string' || !['start', 'playing', 'bingo'].includes(obj.gameState)) {
    return false;
  }

  if (!Array.isArray(obj.board) || (obj.board.length !== 0 && obj.board.length !== 25)) {
    return false;
  }

  const validSquares = obj.board.every((sq: unknown) => {
    if (!sq || typeof sq !== 'object') return false;
    const square = sq as Record<string, unknown>;
    return (
      typeof square.id === 'number' &&
      typeof square.text === 'string' &&
      typeof square.isMarked === 'boolean' &&
      typeof square.isFreeSpace === 'boolean'
    );
  });

  if (!validSquares) {
    return false;
  }

  if (!Array.isArray(obj.cardDeck)) {
    return false;
  }

  const validCards = obj.cardDeck.every((card: unknown) => {
    if (!card || typeof card !== 'object') return false;
    const c = card as Record<string, unknown>;
    return (
      typeof c.id === 'string' &&
      typeof c.text === 'string' &&
      typeof c.isDrawn === 'boolean'
    );
  });

  if (!validCards) {
    return false;
  }

  if (obj.winningLine !== null) {
    if (typeof obj.winningLine !== 'object') {
      return false;
    }
    const line = obj.winningLine as Record<string, unknown>;
    if (
      typeof line.type !== 'string' ||
      !['row', 'column', 'diagonal'].includes(line.type) ||
      typeof line.index !== 'number' ||
      !Array.isArray(line.squares)
    ) {
      return false;
    }
  }

  return true;
}

function loadGameState(): Pick<BingoGameState, 'gameMode' | 'gameState' | 'board' | 'cardDeck' | 'winningLine'> | null {
  // SSR guard
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);

    if (validateStoredData(parsed)) {
      return {
        gameMode: parsed.gameMode,
        gameState: parsed.gameState,
        board: parsed.board,
        cardDeck: parsed.cardDeck,
        winningLine: parsed.winningLine,
      };
    } else {
      console.warn('Invalid game state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load game state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

function saveGameState(gameMode: GameMode, gameState: GameState, board: BingoSquareData[], cardDeck: CardData[], winningLine: BingoLine | null): void {
  // SSR guard
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredGameData = {
      version: STORAGE_VERSION,
      gameMode,
      gameState,
      board,
      cardDeck,
      winningLine,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save game state:', error);
  }
}

export function useBingoGame(): BingoGameState & BingoGameActions {
  const loadedState = useMemo(() => loadGameState(), []);

  const [gameMode, setGameMode] = useState<GameMode>(
    () => loadedState?.gameMode || 'bingo'
  );
  const [gameState, setGameState] = useState<GameState>(
    () => loadedState?.gameState || 'start'
  );
  const [board, setBoard] = useState<BingoSquareData[]>(
    () => loadedState?.board || []
  );
  const [cardDeck, setCardDeck] = useState<CardData[]>(
    () => loadedState?.cardDeck || []
  );
  const [winningLine, setWinningLine] = useState<BingoLine | null>(
    () => loadedState?.winningLine || null
  );
  const [showBingoModal, setShowBingoModal] = useState(false);

  const winningSquareIds = useMemo(
    () => getWinningSquareIds(winningLine),
    [winningLine]
  );

  const currentCard = useMemo(
    () => getCurrentCard(cardDeck),
    [cardDeck]
  );

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    saveGameState(gameMode, gameState, board, cardDeck, winningLine);
  }, [gameMode, gameState, board, cardDeck, winningLine]);

  const setGameModeAction = useCallback((mode: GameMode) => {
    setGameMode(mode);
  }, []);

  const startGame = useCallback(() => {
    if (gameMode === 'bingo') {
      setBoard(generateBoard());
      setCardDeck([]);
    } else if (gameMode === 'card-deck') {
      setCardDeck(generateCardDeck());
      setBoard([]);
    }
    setWinningLine(null);
    setGameState('playing');
  }, [gameMode]);

  const handleSquareClick = useCallback((squareId: number) => {
    setBoard((currentBoard) => {
      const newBoard = toggleSquare(currentBoard, squareId);

      // Check for bingo after toggling
      const bingo = checkBingo(newBoard);
      if (bingo && !winningLine) {
        // Schedule state updates to avoid synchronous setState in effect
        queueMicrotask(() => {
          setWinningLine(bingo);
          setGameState('bingo');
          setShowBingoModal(true);
        });
      }

      return newBoard;
    });
  }, [winningLine]);

  const drawCard = useCallback(() => {
    setCardDeck((currentDeck) => {
      const newDeck = [...currentDeck];
      drawNextCard(newDeck);
      return newDeck;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState('start');
    setBoard([]);
    setCardDeck([]);
    setWinningLine(null);
    setShowBingoModal(false);
  }, []);

  const dismissModal = useCallback(() => {
    setShowBingoModal(false);
  }, []);

  return {
    gameMode,
    gameState,
    board,
    cardDeck,
    currentCard,
    winningLine,
    winningSquareIds,
    showBingoModal,
    setGameMode: setGameModeAction,
    startGame,
    handleSquareClick,
    drawCard,
    resetGame,
    dismissModal,
  };
}
