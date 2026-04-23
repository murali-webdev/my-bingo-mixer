import { useBingoGame } from './hooks/useBingoGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { CardDeckScreen } from './components/CardDeckScreen';
import { BingoModal } from './components/BingoModal';

function App() {
  const {
    gameMode,
    gameState,
    board,
    cardDeck,
    currentCard,
    winningSquareIds,
    showBingoModal,
    setGameMode,
    startGame,
    handleSquareClick,
    drawCard,
    resetGame,
    dismissModal,
  } = useBingoGame();

  if (gameState === 'start') {
    return <StartScreen onStart={startGame} gameMode={gameMode} onSetGameMode={setGameMode} />;
  }

  if (gameMode === 'card-deck') {
    return (
      <CardDeckScreen
        cardDeck={cardDeck}
        currentCard={currentCard}
        onDrawCard={drawCard}
        onReset={resetGame}
      />
    );
  }

  return (
    <>
      <GameScreen
        board={board}
        winningSquareIds={winningSquareIds}
        hasBingo={gameState === 'bingo'}
        onSquareClick={handleSquareClick}
        onReset={resetGame}
      />
      {showBingoModal && (
        <BingoModal onDismiss={dismissModal} />
      )}
    </>
  );
}

export default App;
