import { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const MatchLeaderboardModal = ({ match, onClose }) => {
  const { user } = useContext(AuthContext);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchPredictions = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        // We can fetch all predictions and filter, or add a query param. 
        // We'll just fetch all and filter for now since admin has access to all.
        const { data } = await axios.get('/api/predictions', config);
        const matchPreds = data.filter(p => p.match_id === match.id && p.status === 'VERIFIED');
        // Sort by points highest to lowest
        matchPreds.sort((a, b) => b.points_earned - a.points_earned);
        setPredictions(matchPreds);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatchPredictions();
  }, [match.id, user.token]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex justify-center items-center bg-black/80 backdrop-blur-sm p-3 sm:p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
          className="bg-navy-900 border border-gold/50 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-5xl relative shadow-[0_0_50px_rgba(255,215,0,0.15)] flex flex-col max-h-[95vh] md:max-h-[90vh]"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-light leading-none z-10">&times;</button>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-center mb-2 flex-shrink-0 text-gold">Match Leaderboard</h2>
          
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-shrink-0">
            <img src={match.team_a_logo} alt={match.team_a} className="w-8 h-5 sm:w-10 sm:h-6 object-cover rounded shadow border border-white/10 flex-shrink-0" />
            <p className="text-center text-white font-semibold text-base sm:text-xl tracking-wide">{match.team_a} <span className="text-gold mx-2">{match.score_a} - {match.score_b}</span> {match.team_b}</p>
            <img src={match.team_b_logo} alt={match.team_b} className="w-8 h-5 sm:w-10 sm:h-6 object-cover rounded shadow border border-white/10 flex-shrink-0" />
          </div>

          <div className="overflow-y-auto custom-scrollbar flex-1 pr-2 -mr-2 pb-2">
            {loading ? (
              <p className="text-center text-electric-blue">Loading scores...</p>
            ) : predictions.length === 0 ? (
              <p className="text-center text-gray-400">No verified predictions found for this match.</p>
            ) : (
              <div className="space-y-4">
                {predictions.map((pred, index) => (
                  <div key={pred.id} className={`p-4 rounded-xl border ${index === 0 ? 'bg-gold/10 border-gold shadow-[0_0_15px_rgba(255,215,0,0.2)]' : 'bg-white/5 border-white/10'} flex flex-col md:flex-row gap-4 justify-between items-center`}>
                    
                    {/* User Info */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${index === 0 ? 'bg-gold text-black' : 'bg-white/10 text-white'}`}>
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{pred.user?.name}</p>
                        <p className="text-sm text-gray-400">{pred.user?.email}</p>
                      </div>
                    </div>

                    {/* Prediction Details */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full text-xs text-gray-300 bg-black/20 p-3 rounded-lg flex-1">
                      <div><span className="text-gray-500">Score:</span> {pred.score_a} - {pred.score_b}</div>
                      <div><span className="text-gray-500">Winner:</span> {pred.winner}</div>
                      <div><span className="text-gray-500">First Center:</span> {pred.first_center}</div>
                      <div><span className="text-gray-500">First Corner:</span> {pred.first_corner}</div>
                      <div><span className="text-gray-500">First Scorer:</span> {pred.first_scorer}</div>
                      <div><span className="text-gray-500">🟨 {match.team_a}:</span> {pred.yellow_cards_a}</div>
                      <div><span className="text-gray-500">🟨 {match.team_b}:</span> {pred.yellow_cards_b}</div>
                      <div><span className="text-gray-500">🟥:</span> {pred.red_cards_a} / {pred.red_cards_b}</div>
                    </div>

                    {/* Points */}
                    <div className="text-center w-full md:w-32 flex-shrink-0">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Points Earned</p>
                      <p className={`text-3xl font-display font-black ${index === 0 ? 'text-gold' : 'text-electric-blue'}`}>
                        {pred.points_earned} <span className="text-sm font-normal text-gray-500">/ 10</span>
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MatchLeaderboardModal;
