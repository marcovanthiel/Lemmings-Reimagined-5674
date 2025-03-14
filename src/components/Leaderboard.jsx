import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { format } from 'date-fns';

export default function Leaderboard() {
  const navigate = useNavigate();
  const { highScores } = useGame();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-4"
    >
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Daily High Scores</h1>
        
        <div className="bg-game-secondary rounded-lg p-4 mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-2 text-left">Rank</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-right">Score</th>
                <th className="p-2 text-right">Level</th>
                <th className="p-2 text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((score, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{score.name}</td>
                  <td className="p-2 text-right">{score.score}</td>
                  <td className="p-2 text-right">{score.level}</td>
                  <td className="p-2 text-right">
                    {format(new Date(score.date), 'MMM d, yyyy')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Play Again
          </button>
        </div>
      </div>
    </motion.div>
  );
}