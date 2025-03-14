import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import GameCanvas from './GameCanvas';
import { levels } from '../data/levels';
import { FaQuestion } from 'react-icons/fa';

export default function Game() {
  const navigate = useNavigate();
  const { playerName, currentLevel, setCurrentLevel, score, setScore, addScore } = useGame();
  const [gameState, setGameState] = useState('playing');
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!playerName) {
      navigate('/');
    }
  }, [playerName, navigate]);

  const handleLevelComplete = (levelScore) => {
    setScore(prev => prev + levelScore);
    if (currentLevel === levels.length) {
      setGameState('completed');
      addScore(score + levelScore);
    } else {
      setCurrentLevel(prev => prev + 1);
    }
  };

  const handleGameOver = () => {
    setGameState('failed');
    addScore(score);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-game-primary to-game-secondary"
    >
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4 bg-black bg-opacity-30 p-4 rounded-lg">
          <div className="flex items-center gap-4">
            <div className="text-xl font-bold">Level: {currentLevel}</div>
            <div className="text-xl font-bold">Score: {score}</div>
          </div>
          <div className="text-xl font-bold">{playerName}</div>
          <button
            onClick={() => setShowInstructions(prev => !prev)}
            className={`${showInstructions ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded-full transition-colors`}
          >
            <FaQuestion />
          </button>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <GameCanvas
              level={levels[currentLevel - 1]}
              onComplete={handleLevelComplete}
              onGameOver={handleGameOver}
            />
          </div>

          {showInstructions && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 bg-black bg-opacity-90 p-4 rounded-xl shadow-xl h-fit"
            >
              <h3 className="text-xl font-bold mb-4 text-center">Controls</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <span className="bg-blue-500 px-2 py-1 rounded">1-4</span>
                  <span>Select ability</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-blue-500 px-2 py-1 rounded">Click</span>
                  <span>Apply to lemming</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-green-500 px-2 py-1 rounded">Space</span>
                  <span>Pause/Resume</span>
                </li>
              </ul>
              <div className="text-sm">
                <strong>Abilities:</strong>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">1</span>
                    Builder - Makes bridges
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">2</span>
                    Digger - Digs down
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">3</span>
                    Floater - Survives falls
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">4</span>
                    Blocker - Stops others
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>

        {gameState !== 'playing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center bg-black bg-opacity-30 p-6 rounded-lg"
          >
            <h2 className="text-3xl font-bold mb-4 text-gradient">
              {gameState === 'completed' ? 'Congratulations!' : 'Game Over'}
            </h2>
            <p className="mb-4">Final Score: {score}</p>
            <button
              onClick={() => navigate('/leaderboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              View Leaderboard
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}