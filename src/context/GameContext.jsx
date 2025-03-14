import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [playerName, setPlayerName] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [highScores, setHighScores] = useState(() => {
    const saved = localStorage.getItem('highScores');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }, [highScores]);

  const addScore = (newScore) => {
    const today = new Date().toISOString().split('T')[0];
    const newHighScore = {
      name: playerName,
      score: newScore,
      date: today,
      level: currentLevel
    };
    
    setHighScores(prev => {
      const updated = [...prev, newHighScore]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
      return updated;
    });
  };

  return (
    <GameContext.Provider value={{
      playerName,
      setPlayerName,
      currentLevel,
      setCurrentLevel,
      score,
      setScore,
      highScores,
      addScore
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}